
export function Home() {
    return (
        <section className="home">
            <div className="hero">
                <img src="assets\img\miss-books-logo.png" alt="Miss Books Mascot" className="mascot-logo" />
                <h1>Welcome to Miss Books</h1>
                <p>Discover your next favorite read at Miss Books, where the charm of a dusty old bookstore meets the convenience of online shopping.</p>
                <button className="explore-btn">Explore Our Collection</button>
            </div>
            <div className="highlights">
                <div className="highlight">
                    <img src="assets\img\curated-classics.webp" alt="Curated Classics" />
                    <h2>Curated Classics</h2>
                    <p>Browse our selection of timeless classics, lovingly curated to bring the magic of literature to your home.</p>
                </div>
                <div className="highlight">
                    <img src="assets\img\hidden-gems.webp" alt="Hidden Gems" />
                    <h2>Hidden Gems</h2>
                    <p>Find unique and hard-to-find books that will surprise and inspire. Our collection features hidden treasures waiting to be uncovered.</p>
                </div>
                <div className="highlight">
                    <img src="assets\img\modern-must-reads.webp" alt="Modern Must-Reads" />
                    <h2>Modern Must-Reads</h2>
                    <p>Stay up-to-date with the latest bestsellers and contemporary fiction. We have everything you need for your next book club pick.</p>
                </div>
            </div>
            <div className="community">
                <h2>Join Our Book-Loving Community</h2>
                <p>Share your reviews, join discussions, and connect with fellow book lovers. Miss Books is more than just a store—it's a community.</p>
            </div>
        </section>
    )
}
