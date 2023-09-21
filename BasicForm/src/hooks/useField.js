import {useState, useEffect} from'react'

const useField = ({ maxInputLength, relatedValues }) => {
    const [maxLength, setMaxLength] = useState(maxInputLength)
    const [value, setValue] = useState('')
    const [className, setClassName] = useState("formInput")
    const [error, setError] = useState(false)

    useEffect(() => {
        let hasError = false
        if (value === '') {
            hasError = true
        } else if (value.length > maxLength) {
            hasError = true
        } else if ( relatedValues !== null ) {
            for (let value = 0; value < relatedValues.length; value++) {
                
                
            }
        }
    }, [value])
}

const onChange = (newInput) => {
    setValue(newInput.target.value)
}