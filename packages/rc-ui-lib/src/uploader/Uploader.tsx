import React, { forwardRef, isValidElement, useContext, useImperativeHandle, useRef, useCallback } from 'react';
import classnames from 'classnames';
// Utils
import { isPromise, getSizeStyle, extend, pick } from '../utils';
import { isOversize, filterFiles, readFileContent, toArray, isImageFile } from './utils';
// Components
import Icon from '../icon';

// Types
import { UploaderFileListItem, UploaderInstance, UploaderProps } from './PropsType';
import { UploaderPreviewItem } from './UploaderPreviewItem';
import ImagePreview from '../image-preview';
import ConfigProviderContext from '../config-provider/ConfigProviderContext';

const Uploader = forwardRef<UploaderInstance, UploaderProps>(({
  maxSize = Number.MAX_VALUE,
  maxCount = Number.MAX_VALUE,
  deletable = true,
  showUpload = true,
  previewImage = true,
  previewFullImage = true,
  name = '',
  accept = 'image/*',
  value = [],
  imageFit = 'cover',
  resultType = 'dataUrl',
  uploadIcon = 'photograph',
  capture,
  multiple,
  disabled,
  readonly,
  uploadText,
  afterRead,
  beforeRead,
  beforeDelete,
  previewSize,
  previewOptions,
  previewCoverRender,
  onChange,
  onClosePreview,
  onDelete,
  onOversize,
  onClickPreview,
  onClickUpload,
  className,
  children,
}, ref) => {
  const { prefixCls, createNamespace } = useContext(ConfigProviderContext);
  const [bem] = createNamespace('uploader', prefixCls);

  const imagePreview = useRef(null);
  const inputRef = useRef<HTMLInputElement>();

  const getDetail = useCallback((index = value.length || 0) => ({
    name,
    index,
  }), [name, value.length]);

  const resetInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const onAfterRead = useCallback((items: UploaderFileListItem | UploaderFileListItem[]) => {
    resetInput();
    if (isOversize(items, maxSize)) {
      if (Array.isArray(items)) {
        const result = filterFiles(items, maxSize);
        items = result.valid;
        onOversize?.(result.invalid, getDetail());
        if (!items.length) {
          return;
        }
      } else {
        onOversize?.(items, getDetail());
        return;
      }
    }
    onChange?.([...value, ...toArray(items)]);
    if (afterRead) {
      afterRead(items, getDetail());
    }
  }, [resetInput, maxSize, getDetail, onOversize, onChange, value, afterRead]);

  const readFile = useCallback((files: File | File[]) => {
    if (Array.isArray(files)) {
      const remainCount = +maxCount - value.length;

      if (files.length > remainCount) {
        files = files.slice(0, remainCount);
      }

      Promise.all(files.map((file) => readFileContent(file, resultType))).then((contents) => {
        const fileList = (files as File[]).map((file, index) => {
          const result: UploaderFileListItem = {
            file,
            status: '',
            message: '',
          };

          if (contents[index]) {
            result.content = contents[index] as string;
          }

          return result;
        });
        onAfterRead(fileList);
      });
    } else {
      readFileContent(files, resultType).then((content) => {
        const result: UploaderFileListItem = {
          file: files as File,
          status: '',
          message: '',
        };
        if (content) {
          result.content = content;
        }

        onAfterRead(result);
      });
    }
  }, [maxCount, value.length, resultType, onAfterRead]);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (disabled || !files || !files.length) {
      return;
    }

    const file = files.length === 1 ? files[0] : ([].slice.call(files) as File[]);

    if (beforeRead) {
      const response = beforeRead(file, getDetail()) as File | File[];
      if (!response) {
        resetInput();
        return;
      }

      if (isPromise(response)) {
        response
          .then((data) => {
            if (data) {
              readFile(data);
            } else {
              readFile(file);
            }
          })
          .catch(resetInput);
        return;
      }
    }
    readFile(file);
  }, [disabled, beforeRead, getDetail, resetInput, readFile]);
  const handleClosePreview = useCallback(() => {
    if (onClosePreview) {
      onClosePreview();
    }
  }, [onClosePreview]);

  const handlePreviewImage = useCallback((item: UploaderFileListItem) => {
    if (previewFullImage) {
      const imageFiles = value.filter(isImageFile);
      const images = imageFiles
        .map((image) => image.content || image.url)
        .filter(Boolean) as string[];
      imagePreview.current = ImagePreview.open(
        extend(
          {
            images,
            startPosition: imageFiles.indexOf(item),
            onClose: handleClosePreview,
          },
          previewOptions,
        ),
      );
    }
  }, [previewFullImage, value, previewOptions, handleClosePreview]);

  const closeImagePreview = useCallback(() => {
    if (imagePreview.current) {
      imagePreview.current.close();
    }
  }, []);

  const deleteFile = useCallback((item: UploaderFileListItem, index: number) => {
    const fileList = value.slice(0);
    fileList.splice(index, 1);

    onChange?.(fileList);
    onDelete?.(item, getDetail(index));
  }, [value, onChange, onDelete, getDetail]);

  const renderPreviewItem = useCallback((item: UploaderFileListItem, index: number) => {
    const needPickData = ['imageFit', 'deletable', 'previewSize', 'beforeDelete'] as const;

    const previewData = extend(
      pick({ imageFit, deletable, previewSize, beforeDelete }, needPickData),
      pick(item, needPickData, true)
    );

    return (
      <UploaderPreviewItem
        item={item}
        key={index}
        index={index}
        previewCoverRender={previewCoverRender}
        onClick={() => {
          if (onClickPreview) onClickPreview(item, getDetail(index));
        }}
        onDelete={() => deleteFile(item, index)}
        onPreview={() => handlePreviewImage(item)}
        name={name}
        {...previewData}
      />
    );
  }, [imageFit, deletable, previewSize, beforeDelete, previewCoverRender, onClickPreview, getDetail, deleteFile, handlePreviewImage, name]);

  const renderPreviewList = useCallback(() => {
    if (previewImage) {
      return value.map(renderPreviewItem);
    }
    return null;
  }, [previewImage, value, renderPreviewItem]);

  const handleClickUpload = useCallback((event: React.MouseEvent) => {
    if (onClickUpload) onClickUpload(event);
  }, [onClickUpload]);

  const renderUploadIcon = useCallback(() => {
    if (typeof uploadIcon === 'string') {
      return <Icon name={uploadIcon} className={classnames(bem('upload-icon'))} />;
    }

    if (isValidElement(uploadIcon)) {
      return uploadIcon;
    }

    return null;
  }, [uploadIcon, bem]);

  const renderUpload = useCallback(() => {
    if (value.length >= Number(maxCount) || !showUpload) {
      return null;
    }

    const Input = readonly ? null : (
      <input
        ref={inputRef}
        type="file"
        className={classnames(bem('input'))}
        accept={accept}
        capture={capture as unknown as boolean}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
      />
    );

    if (children) {
      return (
        <div className={classnames(bem('input-wrapper'))} onClick={handleClickUpload}>
          {children}
          {Input}
        </div>
      );
    }

    return (
      <div
        className={classnames(bem('upload', { readonly }))}
        style={getSizeStyle(previewSize)}
        onClick={handleClickUpload}
      >
        {renderUploadIcon()}
        {uploadText && (
          <span className={classnames(bem('upload-text'))}>{uploadText}</span>
        )}
        {Input}
      </div>
    );
  }, [value.length, maxCount, showUpload, readonly, bem, accept, capture, multiple, disabled, handleInputChange, children, handleClickUpload, previewSize, renderUploadIcon, uploadText]);

  const chooseFile = useCallback(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.click();
    }
  }, [disabled]);

  useImperativeHandle(ref, () => ({
    chooseFile,
    closeImagePreview,
  }));

  return (
    <div className={classnames(bem(), className)}>
      <div className={classnames(bem('wrapper', { disabled }))}>
        {renderPreviewList()}
        {renderUpload()}
      </div>
    </div>
  );
});

export default Uploader;
