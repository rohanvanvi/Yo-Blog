import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Handle form submission
    const submit = async (data) => {
        try {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (post) {
                // If post exists, update it
                if (file) {
                    await appwriteService.deleteFile(post.featuredImage); // Delete old image
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : undefined,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`); // Navigate to updated post
                }
            } else {
                // Create a new post
                if (file) {
                    const dbPost = await appwriteService.createPost({
                        ...data,
                        userId: userData.$id,
                        featuredImage: file.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`); // Navigate to the created post
                    }
                }
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        }
    };

    // Function to transform the title into a slug
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return "";
    }, []);

    // Watch the title field to automatically generate the slug
    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return subscription.unsubscribe();
    }, [slugTransform, setValue, watch]);

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-8 bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
            {/* Title and Slug Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                    <Input
                        label="Post Title"
                        placeholder="Enter post title"
                        {...register("title", { required: "Title is required" })}
                        onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value))}
                        className="input-field"
                        error={errors.title?.message}
                    />
                </div>

                <div className="w-full">
                    <Input
                        label="Post Slug"
                        placeholder="Auto-generated from title"
                        {...register("slug", { required: "Slug is required" })}
                        className="input-field"
                        error={errors.slug?.message}
                    />
                </div>
            </div>

            {/* Content Editor */}
            <div>
                <RTE
                    label="Post Content"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                    className="input-field"
                    error={errors.content?.message}
                />
            </div>

            {/* Featured Image and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="w-full">
                    <Input
                        label="Featured Image"
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                        className="input-field"
                        error={errors.image?.message}
                    />
                    {post && (
                        <div className="w-full mt-4">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="rounded-lg shadow-md"
                            />
                        </div>
                    )}
                </div>

                <div className="w-full">
                    <Select
                        options={["active", "inactive"]}
                        label="Post Status"
                        {...register("status", { required: "Status is required" })}
                        className="input-field"
                        error={errors.status?.message}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                className="w-full py-3 text-white font-medium rounded-lg transition-all duration-200 hover:bg-opacity-90"
                bgColor={post ? "bg-green-600" : "bg-blue-600"}
                disabled={Object.keys(errors).length > 0} // Disable button if there are validation errors
            >
                {post ? "Update Post" : "Create Post"}
            </Button>
        </form>
    );
}

export default PostForm;
