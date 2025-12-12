// หน้าจอแสดงผลขณะกำลังโหลดข้อมูล (Loading State UI)
export default function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-12 max-w-4xl w-full shadow-xl animate-pulse">
      {/* Header Skeleton */}
      <div className="w-3/4 h-8 bg-gray-200 rounded-lg mx-auto mb-8"></div>
      
      {/* Circle Icon Skeleton */}
      <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>
      
      {/* Subtext Skeleton */}
      <div className="w-1/2 h-4 bg-gray-200 rounded mx-auto mb-10"></div>
      
      {/* Content Block 1 */}
      <div className="w-full h-12 bg-gray-200 rounded-xl mb-4"></div>
      
      {/* Content Block 2 */}
      <div className="w-full h-24 bg-gray-200 rounded-xl mb-8"></div>
      
      {/* Buttons Skeleton */}
      <div className="flex justify-between items-center mt-8">
        <div className="w-32 h-12 bg-gray-200 rounded-full"></div>
        <div className="w-32 h-12 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}
