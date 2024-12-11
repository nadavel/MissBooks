const {useState} = React

export function LongText({txt, length=100}){
    const [isExpanded, setIsExpanded] = useState(false)
    

    function toggleExpand(){
        setIsExpanded(isExpanded => !isExpanded)
    }

    const isTextTooLong = txt.length > length
    if (!txt) return null;
    const displayText = isExpanded ? txt : txt.substring(0, length)
    
    

    return (
        <section className="long-text">
            <p>{displayText}{isTextTooLong && !isExpanded && '...'}</p>
            {txt.length > length && (
                <button onClick={toggleExpand} className="read-more-btn">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </section>
    )
}