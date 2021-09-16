import { AES } from "crypto-js"
import Configure from "../configure";

export function get(key){
    const stored = sessionStorage.getItem(key);
        if (!stored || stored === "undefined") {
            return null;
        }
    
    const decrypted = AES.decrypt(stored, Configure.AESKey)

    return JSON.parse(decrypted);
}

export function set(key, value){
    const encrypted = AES.encrypt(JSON.stringify(value), Configure.AESKey)
    sessionStorage.setItem(key, encrypted)
    return true
}

export function remove(key){
    sessionStorage.removeItem(key)
    return true
}

const SessionStorageUtil = {
    get,
    set,
    remove
}

export default SessionStorageUtil