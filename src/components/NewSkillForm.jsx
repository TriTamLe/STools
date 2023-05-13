import {
  Await,
  useRouteLoaderData,
  useFetcher,
  redirect,
  json,
} from 'react-router-dom';
//import { Editor } from '@tinymce/tinymce-react';
import { v4 as uuid } from 'uuid';

import { Suspense, useRef, useState } from 'react';
import classes from './NewSkillForm.module.css';
import TextEditor from './TextEditor';
import { compressSVG, createHTMLFile } from '../util';
import { getFileURL, uploadFile, postData } from '../server';
import { useEffect } from 'react';

const NewSkillForm = () => {
  const homeLoader = useRouteLoaderData('home');
  const fetcher = useFetcher();
  const [title, setTitle] = useState('Nhập tên kỹ năng');
  const [tagId, setTagId] = useState('DSMK');
  const [description, setDescription] = useState('Đây là một kỹ năng hấp dẫn');
  const [svgString, setSVGString] = useState('');
  const [state, setState] = useState(false);
  const editorRef = useRef();

  const logContent = () => {
    if (editorRef.current) {
      return editorRef.current.getContent();
    }
  };

  useEffect(() => {
    setState(fetcher.state === 'submitting');
  }, [fetcher.state]);

  const submitForm = async () => {
    const body = {
      title: title,
      tagId: tagId,
      description: description,
      icon: compressSVG(svgString),
      content: logContent(),
    };
    fetcher.submit(body, { method: 'POST' });
  };

  return (
    <div className={classes.newSkillForm}>
      <input
        name='title'
        placeholder='Nhập tên kỹ năng'
        className={classes.skillTitle}
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <div className={classes.skillTag}>
        <label htmlFor='tag'>Nhóm kỹ năng:</label>
        <Suspense>
          <Await resolve={homeLoader.tagsData}>
            {tags => {
              return (
                <select
                  name='tag'
                  placeholder='Chọn nhóm kỹ năng'
                  required
                  value={tagId}
                  onChange={e => setTagId(e.target.value)}
                >
                  {tags.data.map(tag => {
                    return (
                      <option key={tag.id} value={tag.id}>
                        {tag.title}
                      </option>
                    );
                  })}
                </select>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <div className={classes.skillIcon}>
        <label htmlFor='icon'>Nhập mã svg của icon vào</label>
        <textarea
          name='icon'
          value={svgString}
          onChange={e => setSVGString(e.target.value)}
          placeholder='<svg>...</svg>'
        />
      </div>
      <div className={classes.skillDes}>
        <label htmlFor='description'>Mô tả:</label>
        <textarea
          placeholder='Đây là một kỹ năng hấp dẫn'
          name='description'
          required
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className={classes.skillContent}>
        <TextEditor onInit={(evt, editor) => (editorRef.current = editor)} />
      </div>

      <button onClick={submitForm} disabled={state}>
        {state ? 'Đang lưu...' : 'Lưu'}
      </button>
    </div>
  );
};

export default NewSkillForm;

export const action = async ({ request }) => {
  const fdata = await request.formData();
  const toolId = uuid();
  const content = fdata.get('content');

  const file = createHTMLFile(content, toolId);
  const uploadFileResponse = await uploadFile(file);
  console.log(uploadFileResponse);

  const fileURL = await getFileURL('STools', uploadFileResponse.path);

  const body = {
    id: toolId,
    title: fdata.get('title'),
    icon: fdata.get('icon'),
    tagId: fdata.get('tagId'),
    description: fdata.get('description'),
    fileURL: await fileURL.publicUrl,
  };

  const response = await postData('Skills', body);

  if (!response.ok) {
    throw json({ message: 'can not add skills' }, { status: 402 });
  }

  return redirect('..');
};
