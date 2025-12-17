import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import blogData from '../../data.json';

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
        'truyền thống': '🎄',
        'trang trí': '❄️',
        'quà': '🎁',
        'điểm đến': '☃️',
        'món ăn': '🍪',
        'công thức': '🍪'
    };

    for (const [key, emoji] of Object.entries(emojis)) {
        if (title.toLowerCase().includes(key)) {
            return emoji;
        }
    }
    return '🎄';
}

export default function BlogPost({ post }) {
    const router = useRouter();

    // Show loading state when fallback is true and page is being generated
    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>Loading... | Winter Blog</title>
                </Head>
                <Snowflakes />
                <div className="container">
                    <div className="loading">
                        <div className="loading-spinner"></div>
                        <p className="loading-text">Đang tải bài viết...</p>
                    </div>
                </div>
            </>
        );
    }

    // Handle case when post is not found
    if (!post) {
        return (
            <>
                <Head>
                    <title>Không Tìm Thấy | Winter Blog</title>
                </Head>
                <Snowflakes />
                <div className="container">
                    <div className="post-container">
                        <Link href="/" className="back-button">
                            ← Quay về trang chủ
                        </Link>
                        <div className="post-header">
                            <span className="post-emoji">😢</span>
                            <h1 className="post-title">Bài viết không tồn tại</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>{post.title} | Winter Blog</title>
                <meta name="description" content={post.content.substring(0, 160)} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>❄️</text></svg>" />
            </Head>

            <Snowflakes />

            <div className="container">
                <div className="post-container">
                    {/* Back Button */}
                    <Link href="/" className="back-button">
                        ← Quay về trang chủ
                    </Link>

                    {/* Post Header */}
                    <header className="post-header">
                        <span className="post-emoji">{getEmoji(post.title)}</span>
                        <h1 className="post-title">{post.title}</h1>
                        <div className="post-meta">
                            <span>📅 {new Date(post.date).toLocaleDateString('vi-VN', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</span>
                            <span>⏱️ 5 phút đọc</span>
                        </div>
                    </header>

                    {/* Post Content */}
                    <article className="post-content">
                        <p>{post.content}</p>
                        <p>
                            Mùa đông là thời điểm tuyệt vời để quây quần bên gia đình và những người thân yêu.
                            Hãy tận hưởng từng khoảnh khắc ấm áp và tạo nên những kỷ niệm đáng nhớ trong mùa
                            lễ hội này. Chúc bạn có một mùa Giáng Sinh an lành và hạnh phúc! 🎄
                        </p>
                        <p>
                            Đừng quên chia sẻ những trải nghiệm của bạn với chúng tôi. Mỗi câu chuyện đều
                            đặc biệt và xứng đáng được lắng nghe. Cảm ơn bạn đã ghé thăm Winter Blog! ❄️
                        </p>
                    </article>

                    {/* Footer */}
                    <footer className="footer">
                        <div className="footer-icons">🎄 ❄️ ⛄ 🎁 🦌</div>
                        <p className="footer-text">
                            © 2024 Winter Blog | Made with ❤️ for the holiday season
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}

// Generate paths for all blog posts at build time
export async function getStaticPaths() {
    // Generate paths for all posts in data.json
    const paths = blogData.map((post) => ({
        params: { id: post.id },
    }));

    return {
        paths,
        // fallback: true allows new pages to be generated on-demand
        // Try adding a new post to data.json and access its URL without restarting
        fallback: true,
    };
}

// Fetch specific post data based on id param
export async function getStaticProps({ params }) {
    // Find the post with matching id
    const post = blogData.find((p) => p.id === params.id);

    // If post not found, return notFound to show 404
    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
        // Revalidate every 60 seconds for ISR (Incremental Static Regeneration)
        revalidate: 60,
    };
}
