'use client';

import { Book } from '@/data/books';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit?: (data: Book) => void;
}

const subjects = [
  'Mathematics',
  'Chemistry',
  'English',
  'Biology',
  'Physics',
  'Business Studies',
  'History & Government',
  'C.R.E.',
  'Geography',
  'Kiswahili',
];

const forms = ['1', '2', '3', '4'];

export default function BookForm({ initialData, onSubmit }: BookFormProps) {
  // Placeholder for validation state
  const errors: Record<string, string> = {};

  // Placeholder for form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validation placeholder
    // if (onSubmit) { onSubmit(formData); }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={initialData?.title || ''}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.title
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          placeholder="e.g., KCSE Mathematics Revision · Form 4 (Octopus Method)"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          The full title of the book
        </p>
      </div>

      {/* Subject and Form Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Subject Field */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            defaultValue={initialData?.subject || ''}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.subject
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject}</p>
          )}
        </div>

        {/* Form Field */}
        <div>
          <label
            htmlFor="form"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Form <span className="text-red-500">*</span>
          </label>
          <select
            id="form"
            name="form"
            defaultValue={initialData?.form || ''}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.form
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            <option value="">Select a form</option>
            {forms.map((form) => (
              <option key={form} value={form}>
                Form {form}
              </option>
            ))}
          </select>
          {errors.form && (
            <p className="mt-1 text-sm text-red-600">{errors.form}</p>
          )}
        </div>
      </div>

      {/* Price Field */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Price (KES) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 text-sm">KES</span>
          </div>
          <input
            type="number"
            id="price"
            name="price"
            min="0"
            step="0.01"
            defaultValue={initialData?.price || ''}
            className={`w-full pl-16 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.price
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="850"
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-600">{errors.price}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Enter the price in Kenyan Shillings
        </p>
      </div>

      {/* Description Field */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          defaultValue={initialData?.description || ''}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
            errors.description
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          placeholder="A detailed description of the book, its content, and target audience..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Provide a comprehensive description of the book
        </p>
      </div>

      {/* Form Actions */}
      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Save Book
        </button>
      </div>
    </form>
  );
}
