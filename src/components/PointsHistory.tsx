import React from 'react';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  date: string;
}

interface PointsHistoryProps {
  history: HistoryItem[];
}

const PointsHistory: React.FC<PointsHistoryProps> = ({ history }) => {
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-gray-700",
        "bg-gray-900/60 backdrop-blur-md"
      )}
    >
      <h2 className="text-2xl font-bold mb-6">积分历史</h2>
      <div className="flex flex-col space-y-4">
        {history.map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <div className="border-t border-gray-700" />}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-4">
                <div
                  className={cn(
                    "p-2 rounded-lg",
                    item.type === 'earn' ? "bg-green-500" : "bg-red-500",
                    "text-white"
                  )}
                >
                  {item.type === 'earn' ? (
                    <PlusIcon className="w-4 h-4" />
                  ) : (
                    <MinusIcon className="w-4 h-4" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{item.description}</span>
                  <span className="text-sm text-gray-400">{item.date}</span>
                </div>
              </div>
              <span
                className={cn(
                  "font-bold",
                  item.type === 'earn' ? "text-green-400" : "text-red-400"
                )}
              >
                {item.type === 'earn' ? '+' : '-'}{item.amount}
              </span>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PointsHistory; 