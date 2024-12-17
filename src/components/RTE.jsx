import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

function RTE({ name, control, label, defaultValue = "" }) {
    const [EditorComponent, setEditorComponent] = useState(null);

    useEffect(() => {
        const loadEditor = async () => {
            const { Editor } = await import('@tinymce/tinymce-react');
            setEditorComponent(() => Editor);
        };

        loadEditor();
    }, []);

    return (
        <div className="w-full">
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            {EditorComponent ? (
                <Controller
                    name={name || 'content'}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <EditorComponent
                            apiKey={conf.tinyMceApiKey}
                            initialValue={defaultValue}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    "image", "advlist", "autolink", "lists", "link",
                                    "charmap", "preview", "anchor", "searchreplace",
                                    "visualblocks", "code", "fullscreen", "insertdatetime",
                                    "media", "table", "code", "help", "wordcount", "anchor",
                                ],
                                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                            onEditorChange={onChange}
                        />
                    )}
                />
            ) : (
                <div>Loading Editor...</div>
            )}
        </div>
    );
}

export default RTE;
