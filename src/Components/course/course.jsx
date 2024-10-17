import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

const courseSchema = Yup.object().shape({
  language: Yup.string().required('Course language is required'),
  category: Yup.string().required('Category is required'),
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  type: Yup.string().oneOf(['accredited', 'live'], 'Invalid course type').required('Type is required'),
  isPaid: Yup.boolean().required('Please select whether the course is paid or free'),
  image: Yup.mixed()
    .required('Image is required')
    .test('fileSize', 'File size too large', value => value && value.size <= 2000000) 
    .test('fileFormat', 'Unsupported format', value => value && ['image/jpeg', 'image/png'].includes(value.type)),
  thumbnail: Yup.mixed()
    .required('Thumbnail is required')
    .test('fileSize', 'File size too large', value => value && value.size <= 2000000)
    .test('fileFormat', 'Unsupported format', value => value && ['image/jpeg', 'image/png'].includes(value.type)),
  preview: Yup.mixed()
    .required('Preview video is required')
    .test('fileSize', 'File size too large', value => value && value.size <= 5000000) 
    .test('fileFormat', 'Unsupported format', value => value && ['video/mp4'].includes(value.type)),
});

const Courses = () => {
  const formik = useFormik({
    initialValues: {
      language: 'English',
      category: '',
      title: '',
      description: '',
      type: 'accredited',
      isPaid: true,
      image: null,
      thumbnail: null,
      preview: null,
    },
    validationSchema: courseSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success('Course added successfully');
    },
  });

  return (<>
    <h2 className="my-4 text-center fs-1 fw-bold  ">Add Course</h2>
    <div className="container-fluid w-75 px-5 mx-auto p-3 g-5 mt-4 bg-light ">
  
      <form onSubmit={formik.handleSubmit} className="p-2 my-4 ">

        {/* Language */}
        <div className="mb-3">
          <label htmlFor="language" className="form-label">Course Language *</label>
          <select
            className="form-select"
            name="language"
            value={formik.values.language}
            onChange={formik.handleChange}
          >
            <option value="English">English</option>
            <option value="English">Arabic</option>
          </select>
          {formik.errors.language && <div className="text-danger">{formik.errors.language}</div>}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category *</label>
          <input
            type="text"
            className="form-control"
            name="category"
            // value={formik.values.category}
            // onChange={formik.handleChange}
            // required
            {...formik.getFieldProps('category')}
          />
          {formik.errors.category && <div className="text-danger">{formik.errors.category}</div>}
        </div>

        {/* Title */}
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Course Title *</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            required
          />
          {formik.errors.title && <div className="text-danger">{formik.errors.title}</div>}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Course Description *</label>
          <textarea
            className="form-control"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            required
          />
          {formik.errors.description && <div className="text-danger">{formik.errors.description}</div>}
        </div>

        {/* Type */}
        <div className="mb-3">
          <label htmlFor="type" className="form-label">Type *</label>
          <select
            className="form-select"
            name="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          >
            <option value="accredited">Accredited</option>
            <option value="live">Live</option>
          </select>
          {formik.errors.type && <div className="text-danger">{formik.errors.type}</div>}
        </div>

        {/* Is Paid */}
        <div className="mb-3">
          <label className="form-label">Is This Course Paid? *</label>
          <div>
            <label className="form-check-label p-3 mx-3">
              <input
                type="radio"
                name="isPaid"
                value={true}
                checked={formik.values.isPaid === true}
                onChange={() => formik.setFieldValue('isPaid', true)}
                className="form-check-input"
              />
              Paid
            </label>
            <label className="form-check-label">
              <input
                type="radio"
                name="isPaid"
                value={false}
                checked={formik.values.isPaid === false}
                onChange={() => formik.setFieldValue('isPaid', false)}
                className="form-check-input"
              />
              Free
            </label>
          </div>
          {formik.errors.isPaid && <div className="text-danger">{formik.errors.isPaid}</div>}
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image *</label>
          <input
            type="file"
            className="form-control"
            name="image"
            onChange={(e) => formik.setFieldValue('image', e.currentTarget.files[0])}
          />
          {formik.errors.image && <div className="text-danger">{formik.errors.image}</div>}
        </div>

        {/* Thumbnail */}
        <div className="mb-3">
          <label htmlFor="thumbnail" className="form-label">Thumbnail *</label>
          <input
            type="file"
            className="form-control"
            name="thumbnail"
            onChange={(e) => formik.setFieldValue('thumbnail', e.currentTarget.files[0])}
          />
          {formik.errors.thumbnail && <div className="text-danger">{formik.errors.thumbnail}</div>}
        </div>

        {/* Preview */}
        <div className="mb-3">
          <label htmlFor="preview" className="form-label">Preview *</label>
          <input
            type="file"
            className="form-control"
            name="preview"
            onChange={(e) => formik.setFieldValue('preview', e.currentTarget.files[0])}
          />
          {formik.errors.preview && <div className="text-danger">{formik.errors.preview}</div>}
        </div>

        {/* Save & Next Button */}
        <button type="submit" className="btn btn-primary">Save & Next</button>
      </form>
    </div>
    </>
  );
  
};

export default Courses;
