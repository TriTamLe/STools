import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ onInit }) => {
  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINY_API_KEY}
        onInit={onInit}
        initialValue='<p>Nhập nội dung tại đây</p>'
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style:
            'body { font-family:Helvetica,Arial,sans-serif; font-size:1.3rem }',
        }}
      />
    </>
  );
};
export default TextEditor;
