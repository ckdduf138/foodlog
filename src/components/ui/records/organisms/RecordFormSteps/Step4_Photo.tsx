import React from "react";
import { UploadCloud, CheckCircle2 } from "lucide-react";

interface Step4PhotoProps {
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  photoPreview: string | null;
}

export const Step4Photo: React.FC<Step4PhotoProps> = ({
  onFormChange,
  photoPreview,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900">
          음식 사진을 추가해보세요
        </label>

        <div className="relative group">
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={onFormChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer block border-2 border-dashed border-gray-300 rounded-3xl text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-300 group-hover:scale-[1.02] overflow-hidden"
          >
            {photoPreview ? (
              <div className="relative w-full aspect-square max-h-64">
                <img
                  src={photoPreview}
                  alt="Selected food"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                  <p className="text-white font-semibold">사진 변경하기</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3 py-8">
                <div className="w-10 h-10 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <UploadCloud className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    사진 추가하기
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    클릭하여 갤러리에서 선택하세요
                  </p>
                </div>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-3 border border-green-100">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-3 h-3 text-white" />
          </div>
          <p className="text-sm text-green-700 font-medium">
            사진은 나중에 추가하거나 변경할 수도 있어요
          </p>
        </div>
      </div>
    </div>
  );
};
