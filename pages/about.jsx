export function About() {
    return (
        <section className="about">
            <div className="about-intro">
                <img src="assets\img\miss-books-logo.png" alt="Miss Books Logo" className="about-logo" />
                <h1>About Miss Books</h1>
                <p>Miss Books is an online bookstore that aims to bring the cozy, nostalgic feeling of a traditional bookstore to your digital world. We are dedicated to curating the best books, ranging from timeless classics to modern must-reads and hidden literary gems.</p>
            </div>
            <div className="our-story">
                <div className="story-content">
                    <h2>Our Story</h2>
                    <p>Miss Books began with a simple idea: to create a space where book lovers can discover, discuss, and fall in love with literature. Inspired by the charm of small, dusty bookstores, we wanted to build a community where every book has a story, and every reader feels at home. Whether you're looking for a classic to read by the fire or a thrilling new bestseller, we've got something for everyone.</p>
                </div>
                <img src="assets\img\cozy-bookstore.webp" alt="Cozy Bookstore" className="story-image" />
            </div>
            <div className="our-mission">
                <img src="assets\img\group-reading.webp" alt="Group Reading" className="mission-image" />
                <div className="mission-content">
                    <h2>Our Mission</h2>
                    <p>At Miss Books, we believe in the power of books to inspire, educate, and entertain. Our mission is to make literature accessible to everyone while maintaining the magic of discovery that comes with browsing a well-loved bookstore. We carefully select every title in our collection, ensuring that each book offers something unique for our readers.</p>
                </div>
            </div>
            <div className="community">
                <h2>Join Our Book-Loving Community</h2>
                <p>Share your reviews, join discussions, and connect with fellow book lovers. Miss Books is more than just a store—it's a community.</p>
                <img src="assets\img\book-community.webp" alt="Book Community" className="community-image" />
            </div>
        </section>
    );
}