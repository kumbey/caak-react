
export function get(key){
    const stored = sessionStorage.getItem(key);
        if (!stored || stored === "undefined") {
            return null;
        }
    return JSON.parse(stored);
}

export function set(key, value){
    sessionStorage.setItem(key, JSON.stringify(value))
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