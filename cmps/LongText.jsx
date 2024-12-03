const {useState} = React

export function LongText({txt, length=100}){
    const [isExpanded, setIsExpanded] = useState(false)
    

    function toggleExpand(){
        setIsExpanded(isExpanded => !isExpanded)
    }

    if (!txt) return null;
    const displayText = isExpanded ? txt : txt.slice(0, length)
    console.log(displayText);
    console.log(txt);
    
    

    return (
        <section className="long-text">
            <p>{displayText}{txt.length > length && !isExpanded && '...'}</p>
            {txt.length > length && (
                <button onClick={toggleExpand} className="read-more-btn">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            )}
        </section>
    )
}