class Validator {
    isNotEmpty(data) {
        return data.length > 0
    }

    isEmpty(data) {
        return data.length === 0
    }

    min(data, limit) {
        return data.length > limit
    }

    max(data, limit) {
        return data.length <= limit
    }

    isNumber(data) {
        return !isNaN(data);
    }

    isEmail(data) {
        let regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return regExp.test(data);
    }
}


export default new Validator