import Head from 'next/head';
import Link from 'next/link';
import blogData from '../data.json';

// Snowflakes Component
function Snowflakes() {
  return (
    <div className="snowflakes" aria-hidden="true">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="snowflake">❄</div>
      ))}
    </div>
  );
}

// Get emoji from title
function getEmoji(title) {
  const emojis = {
    'traditions': '🎄',
    'trang trí': '❄️',
    'quà': '🎁',
    'điểm đến': '☃️',
    'món ăn': '🍪'
  };

  for (const [key, emoji] of Object.entries(emojis)) {
    if (title.toLowerCase().includes(key)) {
      return emoji;
    }
  }
  return '🎄';
}

export default function Home({ posts }) {
  return (
    <>
      <Head>
        <title>Winter Blog ❄️ | Câu Chuyện Mùa Đông</title>
        <meta name="description" content="Blog về Giáng Sinh và mùa đông - Khám phá những câu chuyện ấm áp trong tiết trời lạnh giá" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❄️</text></svg>" />
      </Head>

      <Snowflakes />

      {/* Decorative Elements */}
      <span className="decoration decoration-1">🎄</span>
      <span className="decoration decoration-2">⛄</span>
      <span className="decoration decoration-3">🎁</span>
      <span className="decoration decoration-4">🦌</span>

      <div className="container">
        {/* Header */}
        <header className="header">
          <h1 className="logo">❄️ Winter Blog</h1>
          <p className="tagline">Câu Chuyện Mùa Đông</p>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <h1>Chào Mừng Đến Với<br />Thế Giới Giáng Sinh ✨</h1>
          <p>
            Khám phá những câu chuyện tuyệt vời về mùa đông, truyền thống lễ hội,
            và những khoảnh khắc ấm áp bên gia đình trong tiết trời se lạnh.
          </p>
        </section>

        {/* Blog Grid */}
        <main className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-card">
              <div className="card-image">
                {getEmoji(post.title)}
              </div>
              <div className="card-content">
                <span className="card-date">
                  📅 {new Date(post.date).toLocaleDateString('vi-VN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <h2 className="card-title">{post.title}</h2>
                <p className="card-excerpt">{post.content}</p>
                <Link href={`/blog/${post.id}`} className="read-more">
                  Đọc thêm
                </Link>
              </div>
            </article>
          ))}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-icons">🎄 ❄️ ⛄ 🎁 🦌</div>
          <p className="footer-text">
            © 2024 Winter Blog | Made with ❤️ for the holiday season
          </p>
        </footer>
      </div>
    </>
  );
}

// Static Site Generation - Fetch data at build time
export async function getStaticProps() {
  // In a real app, this could fetch from an API or CMS
  // Here we're using local JSON file
  const posts = blogData;

  return {
    props: {
      posts,
    },
  };
}
