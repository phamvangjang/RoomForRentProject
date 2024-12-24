const validate = (payload,setInvalidFields) => {
    let invalids = 0
    let fields = Object.entries(payload)
    fields.forEach(item => {
        if (item[1] === '') {
            setInvalidFields(prev => [...prev, {
                name: item[0],
                message: 'This field must not is empty'
            }])
            invalids++
        }
    })
    fields.forEach(item => {
        switch (item[0]) {
            case 'password':
                if (item[1].length < 6) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Password must be at least 6 characters'
                    }])
                    invalids++
                }
                break;
            case 'phone':
                if (!+item[1]) {
                    setInvalidFields(prev => [...prev, {
                        name: item[0],
                        message: 'Your phone number is invalid'
                    }])
                    invalids++
                }
                break;
            default:
                break;
        }
    })
    return invalids
}
export default validate