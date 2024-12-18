import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
    }, []);

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    if (posts.length === 0) {
        return (
            <div className="w-full py-24 bg-gradient-to-b from-gray-50 to-gray-100">
                <Container>
                    <div className="flex flex-col justify-center items-center p-8">
                        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">
                            No Posts Yet!
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 max-w-xl text-center">
                            It seems there are no posts available right now. Log in to stay updated with the latest insights, stories, and news shared by the community.
                        </p>
                        <button
                            onClick={handleLoginRedirect}
                            className="px-8 py-3 rounded-full bg-blue-600 text-white text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl focus:outline-none"
                        >
                            Login Now
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-24 bg-gradient-to-b from-gray-50 to-gray-100">
            <Container>
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                        Discover Inspiring Stories
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Explore the latest blogs, articles, and insights shared by our community. Dive into a world of knowledge and inspiration, curated just for you.
                    </p>
                    <div className="border-t border-gray-300 mx-auto w-16 mb-8"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {posts.map((post) => (
                        <div
                            key={post.$id}
                            className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
                        >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
