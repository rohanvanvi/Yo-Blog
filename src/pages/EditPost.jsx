import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container, PostForm } from "../components";

function EditPost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true); // Manage loading state
    const { slug } = useParams();
    const navigate = useNavigate();

    // Fetch the post based on slug
    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((fetchedPost) => {
                    if (fetchedPost) {
                        console.log("Fetched Post:", fetchedPost); // Debug: log the fetched post data
                        setPost(fetchedPost); // Set post data
                        setLoading(false); // Stop loading once post is fetched
                    } else {
                        console.error("Post not found");
                        navigate("/"); // Redirect if post not found
                    }
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    setLoading(false); // Stop loading if error occurs
                    navigate("/"); // Redirect if error occurs
                });
        } else {
            console.error("Slug is missing");
            navigate("/"); // Redirect if slug is missing
        }
    }, [slug, navigate]);

    // Show loading state while fetching post
    if (loading) {
        return (
            <div className="py-8 bg-gray-50 min-h-screen">
                <Container>
                    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 space-y-6">
                        <div className="text-center">
                            <p>Loading post data...</p>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-8 bg-gray-50 min-h-screen">
            <Container>
                <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 space-y-6">
                    {/* Heading */}
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-800">Edit Post</h2>
                        <p className="mt-2 text-gray-600">Update your post details below.</p>
                    </div>

                    {/* Post Form */}
                    {post ? (
                        <PostForm post={post} />
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>Post not found. Please try again later.</p>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default EditPost;
