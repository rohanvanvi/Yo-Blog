import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();  // Initialize the navigate function

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
    }, []);

    const handleLoginRedirect = () => {
        navigate("/login");  // Redirect to the login page when the button is clicked
    };

    if (posts.length === 0) {
        return (
            <div className="w-full py-12 mt-4 text-center">
                <Container>
                    <div className="flex flex-col justify-center items-center p-6">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                            No posts available
                        </h1>
                        <p className="text-lg text-gray-500 mb-6">
                            Login to read the latest posts and stay updated with our blog.
                        </p>
                        <button 
                            onClick={handleLoginRedirect}  // Add the onClick handler here
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-lg hover:bg-blue-700 transition duration-300">
                            Login Now
                        </button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-12 bg-white">
            <Container>
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">
                    Latest Blog Posts
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-full">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
