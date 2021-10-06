const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();
const DB = require("/opt/tables/DB")
const Post = DB(process.env.API_CAAKMN_POSTTABLE_NAME, docClient)
const PostHistory = DB(process.env.API_CAAKMN_POSTHISTORYTABLE_NAME, docClient)
const PostItems = DB(process.env.API_CAAKMN_POSTITEMSTABLE_NAME ,docClient)

async function createPost(ctx){
    try{

        const { items, ...post } = ctx.arguments.input
        const user_id = ctx.identity.claims.sub

        let result = {
            data: null,
            erros: null
        }

        post.status = "PENDING"
        post.user_id = user_id
        post.updated_user_id = user_id

        let resp = await Post.create(post)
        let respItems = []

        for(let i=0; i < items.length; i++){
            let item = items[i]
            item.post_id = resp.id
            respItems.push(await PostItems.create(item))
        }

        result = {...resp,  items: respItems}

        return result
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function updatePost(ctx){
    try{

        const { items, ...post } = ctx.arguments.input
        const user_id = ctx.identity.claims.sub

        let result = {
            data: null,
            erros: null
        }

        post.status = "PENDING"
        post.updated_user_id = user_id

        let oldPost = await Post.get(post.id)
        let resp = await Post.update(post)
        let respItems = []
        let removedItems = []
        
        let oldItems = await PostItems.list("post_id", resp.id, "byPost")
        
        oldPost = {...oldPost, items: oldItems}
        PostHistory.create({post: oldPost})

        for(let i=0; i < oldItems.length; i++){
            let oldItem = oldItems[i]
            if(!items.find(item => item.id === oldItem.id)){
                removedItems.push(oldItem)
            }
        }
        
        for(let i=0; i < removedItems.length; i++){
            let item = removedItems[i]
            await PostItems.remove(item.id)
        }

        for(let i=0; i < items.length; i++){
            let item = items[i]
            item.post_id = resp.id
            if(item.id){
                respItems.push(await PostItems.update(item))
            }else{
                respItems.push(await PostItems.create(item))
            }
        }

        result = {...resp,  items: respItems}

        return result
    }catch(ex){
        console.log(ex)
        return ex
    }
}

async function updatePostStatus(ctx){
    try{

        const { id, status } = ctx.arguments.input
        const post = {
            id: id,
            status: status
        }

        let result = {
            data: null,
            erros: null
        }

        let resp = await Post.update(post)
        result = resp

        return result
    }catch(ex){
        console.log(ex)
        return ex
    }
}

module.exports = {
    createPost: createPost,
    updatePost: updatePost,
    updatePostStatus: updatePostStatus
}