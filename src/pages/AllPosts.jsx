import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                setPosts(posts.documents);
            });
    }, []);

    return (
        <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-gray-100">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
                        All Posts
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        Explore a collection of insightful and inspiring stories shared by our community. Stay updated with the latest posts across various topics.
                    </p>
                    <div className="border-t border-gray-300 mx-auto w-16 mb-8"></div>
                </div>

                {/* Grid Layout for Posts */}
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

export default AllPosts;
