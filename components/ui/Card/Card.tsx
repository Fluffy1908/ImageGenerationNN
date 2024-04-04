import { ReactNode } from 'react';

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export default function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl my-8 border rounded-lg shadow-lg overflow-hidden bg-blue-50 border-blue-400">
      <div className="px-6 py-5">
        <h3 className="mb-2 text-3xl font-semibold text-blue-800">{title}</h3>
        {description && <p className="mb-4 text-black">{description}</p>}
        <div className="text-gray-700">{children}</div>
      </div>
      {footer && (
        <div className="px-6 py-4 bg-blue-100 text-black border-t border-blue-500">
          {footer}
        </div>
      )}
    </div>
  );
}
