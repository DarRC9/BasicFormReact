export function UnsuccesfullValidation ({ error, sectionType }) {
    if (error === false) return null

    return (
        <div className='warnMessage' data-testid="warnMessage">
          Validation Failed Revise your data
        </div>
    )
}