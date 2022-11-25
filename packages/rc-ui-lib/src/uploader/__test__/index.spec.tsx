import React, { useRef } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Uploader, { UploaderInstance } from '..';
import Icon from '../../icon';
import TestsDOM from '../../../tests/dom';
import { UploaderFileListItem, UploaderProps } from '../PropsType';
import { sleep } from '../../../tests/utils';

describe('<Uploader/>', () => {
  const mockFile = new File([new ArrayBuffer(10000)], 'foo.png', {
    type: 'image/png',
  });

  const mockTextFile = new File([new ArrayBuffer(10000)], 'foo.txt', {
    type: 'text/plain',
  });

  const mockFileDataUrl = 'data:image/test';

  function mockReadAsText(this: FileReader) {
    if (this.onload) {
      this.onload({
        target: {
          result: mockFileDataUrl,
        },
      } as ProgressEvent<FileReader>);
    }
  }

  Object.defineProperty(window.FileReader.prototype, 'readAsText', {
    value: mockReadAsText,
  });

  Object.defineProperty(window.FileReader.prototype, 'readAsDataURL', {
    value: mockReadAsText,
  });

  function createUploader(props: UploaderProps) {
    const { container, rerender } = render(<Uploader {...props} />);

    return {
      container,
      input: () => TestsDOM.mustQuerySelector<HTMLInputElement>(container, '.rc-uploader__input'),
      rerender,
    };
  }

  it('disabled', async () => {
    const onChange = jest.fn();

    const { input } = createUploader({
      disabled: true,
      onChange,
    });

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(onChange).toBeCalledTimes(0));
  });

  it('read file', async () => {
    const onChange = jest.fn();

    const { input } = createUploader({
      onChange: ([file]) => {
        expect(file.content).toBe(mockFileDataUrl);
        onChange();
      },
    });

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(onChange).toBeCalledTimes(1));
  });

  it('beforeRead', async () => {
    const afterRead = jest.fn();

    const { input } = createUploader({
      beforeRead: async (files: File[]) => {
        return new Promise<File[]>((resolve) => {
          resolve(files);
        });
      },
      afterRead,
    });

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(afterRead).toHaveBeenCalledTimes(1));
  });

  it('thumbnail', async () => {
    const fileUrl = 'https://upload.com/foo.txt';
    const imageUrl = 'https://dummyimage.com/300x200/fff.png';

    const { container } = createUploader({
      value: [
        {
          status: 'uploading',
          content: imageUrl,
        },
        {
          status: 'failed',
          content: imageUrl,
          message: 'failed',
        },
        {
          status: 'done',
          content: fileUrl,
          message: 'done',
        },
        {
          status: 'done',
          content: fileUrl,
          removable: false,
          message: 'done',
        },
      ],
    });

    expect(container).toMatchSnapshot();
  });

  it('max-count', async () => {
    const onChange = jest.fn();

    const props: UploaderProps = {
      maxCount: 2,
      multiple: true,
      value: [
        {
          url: 'https://dummyimage.com/600x400/000/fff.png',
          status: 'uploading',
          thumbnail: false,
        },
      ],
      onChange: (files) => {
        onChange(files.length);
      },
    };

    const { container, input, rerender } = createUploader(props);

    fireEvent.change(input(), {
      target: { files: [mockFile, mockFile, mockFile] },
    });

    await waitFor(() => expect(onChange).toBeCalledWith(2));

    const props2 = {
      ...props,
      value: [
        {
          isImage: false,
          url: 'https://upload.com/foo.txt',
          status: 'done',
          thumbnail: false,
        },
        {
          isImage: true,
          url: 'https://dummyimage.com/300x200/fff.png',
          status: 'done',
          content: 'https://dummyimage.com/50/fff.png',
        },
      ],
    };
    rerender(<Uploader {...props2} />);

    expect(container).toMatchSnapshot();
  });

  it('render children', () => {
    const { container } = createUploader({
      previewImage: false,
      value: [],
      children: <div>children</div>,
    });

    expect(container).toMatchSnapshot();
  });

  it('test preview', async () => {
    const onPreview = jest.fn();
    const onClosePreview = jest.fn();

    const { container } = createUploader({
      value: [
        {
          isImage: false,
          url: 'https://upload.com/foo.txt',
          status: 'done',
          thumbnail: false,
          file: mockTextFile,
        },
        {
          isImage: true,
          url: 'https://dummyimage.com/300x200/fff.png',
          status: 'done',
          content: 'https://dummyimage.com/50/fff.png',
        },
      ],
      onClickPreview: (file: UploaderFileListItem) => {
        onPreview(file.url);
      },
      onClosePreview,
      previewImage: true,
      previewFullImage: true,
    });

    const file = TestsDOM.mustQuerySelector(container, '.rc-uploader__file');

    fireEvent.click(file);

    expect(onPreview).toBeCalledWith('https://upload.com/foo.txt');

    const image = TestsDOM.mustQuerySelector(container, '.rc-uploader__preview-image');

    fireEvent.click(image);

    expect(onPreview).toBeCalledWith('https://dummyimage.com/300x200/fff.png');

    const imagePreview = TestsDOM.mustQuerySelector(document.body, '.rc-image-preview__image');

    fireEvent.click(imagePreview);
    expect(onClosePreview).toHaveBeenCalled();
  });

  it('test remove', async () => {
    const onDelete = jest.fn().mockResolvedValue(false);

    const { container } = createUploader({
      value: [
        {
          isImage: false,
          url: 'https://upload.com/foo.txt',
          status: 'done',
          thumbnail: false,
        },
        {
          isImage: true,
          url: 'https://dummyimage.com/300x200/fff.png',
          status: 'done',
          content: 'https://dummyimage.com/50/fff.png',
        },
      ],
      onDelete,
    });

    expect(container).toMatchSnapshot();

    const target = TestsDOM.mustQuerySelector(container, '.rc-uploader__preview-delete');

    fireEvent.click(target);
    await waitFor(() => expect(onDelete).toBeCalledTimes(1));
    expect(container).toMatchSnapshot();
  });

  it('test previewCoverRender', async () => {
    const { container } = createUploader({
      value: [
        {
          // isImage: false,
          url: 'https://upload.com/foo.txt',
          status: 'done',
          thumbnail: false,
        },
        {
          isImage: true,
          url: 'https://dummyimage.com/300x200/fff.png',
          status: 'done',
          content: 'https://dummyimage.com/50/fff.png',
        },
      ],
      previewCoverRender: (item: UploaderFileListItem) => <p>{item.url}</p>,
    });

    expect(container).toMatchSnapshot();
  });

  it('test before read return false', async () => {
    const afterRead = jest.fn();

    const props: UploaderProps = {
      beforeRead: () => undefined,
      afterRead,
    };

    const { input } = createUploader(props);

    fireEvent.change(input(), { target: { files: [mockFile] } });

    expect(afterRead).toHaveBeenCalledTimes(0);
  });

  it('before read return promise and resolve no value', async () => {
    const afterRead = jest.fn();

    const props: UploaderProps = {
      beforeRead: () =>
        new Promise<undefined>((resolve) => {
          resolve(undefined);
        }),
      afterRead,
    };

    const { input } = createUploader(props);

    fireEvent.change(input(), { target: { files: [mockFile] } });

    expect(afterRead).toHaveBeenCalledTimes(0);
  });

  it('should trigger oversize event when file size is over limit', async () => {
    const onChange = jest.fn();
    const onOversize = jest.fn();

    const props: UploaderProps = {
      maxSize: 1,
      onChange: ([file]) => {
        onChange(file);
      },
      onOversize,
    };

    const { input, rerender } = createUploader(props);

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(onChange).toBeCalledTimes(0));
    await waitFor(() => expect(onOversize).toBeCalledTimes(1));

    const props2 = {
      ...props,
      multiple: true,
      maxSize: 100000,
    };

    rerender(<Uploader {...props2} />);

    fireEvent.change(input(), { target: { files: [mockFile, mockFile, mockFile] } });
    await waitFor(() => expect(onChange).toBeCalledTimes(1));

    const props3 = {
      ...props,
      multiple: true,
      maxSize: 2,
    };

    rerender(<Uploader {...props3} />);

    fireEvent.change(input(), { target: { files: [mockFile, mockFile, mockFile] } });
    await waitFor(() => expect(onChange).toBeCalledTimes(1));
  });

  it('should trigger clickUpload event when click upload content', async () => {
    const onClickUpload = jest.fn();

    const props: UploaderProps = {
      onClickUpload,
    };

    const { container } = createUploader(props);

    const target = TestsDOM.mustQuerySelector(container, '.rc-uploader__input');

    fireEvent.click(target);

    await waitFor(() => expect(onClickUpload).toBeCalledTimes(1));
  });

  // <Icon name={props.uploadIcon} className={classnames(bem('upload-icon'))} />
  it('should render correctly when icon prop is ReactNode', async () => {
    const props: UploaderProps = {
      uploadIcon: <Icon name="photograph" />,
    };

    const { container, rerender } = createUploader(props);

    expect(container).toMatchSnapshot();

    rerender(<Uploader uploadIcon={null} />);

    expect(container).toMatchSnapshot();
  });

  it('test chooseFile', async () => {
    const Demo = () => {
      const uploaderRef = useRef<UploaderInstance>(null);

      const handleChoose = () => {
        uploaderRef.current?.chooseFile();
      };

      return (
        <div>
          <Uploader ref={uploaderRef} />
          <button type="button" data-testid="button" onClick={handleChoose}>
            chooseFile
          </button>
        </div>
      );
    };

    const { container, getByTestId } = render(<Demo />);

    const buttonBox = getByTestId('button');

    fireEvent.click(buttonBox);

    expect(container).toMatchSnapshot();
  });

  it('test closeImagePreview', async () => {
    const Demo = () => {
      const uploaderRef = useRef<UploaderInstance>(null);

      const handleCloseImagePreview = () => {
        uploaderRef.current?.closeImagePreview();
      };
      const $props = {
        value: [
          {
            isImage: true,
            url: 'https://dummyimage.com/300x200/fff.png',
            status: 'done',
            content: 'https://dummyimage.com/50/fff.png',
          },
        ],
      };

      return (
        <div>
          <Uploader ref={uploaderRef} {...$props} />
          <button type="button" data-testid="button" onClick={handleCloseImagePreview}>
            closeImagePreview
          </button>
        </div>
      );
    };

    const { container, getByTestId } = render(<Demo />);

    const image = TestsDOM.mustQuerySelector(container, '.rc-uploader__preview-image');

    await waitFor(() => {
      fireEvent.click(image);
    });
    const popup: HTMLElement = TestsDOM.mustQuerySelector(document.body, '.rc-image-preview');

    await sleep(600);
    expect(popup).toMatchSnapshot();

    const buttonBox = getByTestId('button');

    await waitFor(() => {
      fireEvent.click(buttonBox);
    });
    await sleep(600);

    expect(popup).toMatchSnapshot();
  });

  it('result-type as text', async () => {
    const onChange = jest.fn();

    const props: UploaderProps = {
      resultType: 'text',
      afterRead(readFile: UploaderFileListItem | UploaderFileListItem[]) {
        expect((readFile as UploaderFileListItem).content).toEqual(mockFileDataUrl);
      },
      onChange: (files) => {
        onChange(files.length);
      },
    };

    const { input } = createUploader(props);

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(onChange).toBeCalledWith(1));
  });

  it('result-type as file', async () => {
    const onChange = jest.fn();

    const props: UploaderProps = {
      resultType: 'file',
      afterRead(readFile: UploaderFileListItem | UploaderFileListItem[]) {
        expect((readFile as UploaderFileListItem).file).toBeTruthy();
        expect((readFile as UploaderFileListItem).content).toBeFalsy();
      },
      onChange: (files) => {
        onChange(files.length);
      },
    };

    const { input } = createUploader(props);

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(onChange).toBeCalledWith(1));
  });

  it('should allow to custom max-size for different type of files', async () => {
    const onChange = jest.fn();

    const props: UploaderProps = {
      maxSize(file: File) {
        if (file.type === 'test') {
          return file.size > 500;
        }
        return false;
      },
      onChange: (files) => {
        onChange(files.length);
      },
    };

    const { input } = createUploader(props);

    fireEvent.change(input(), { target: { files: [mockFile] } });

    await waitFor(() => expect(onChange).toBeCalledWith(1));
  });
});
