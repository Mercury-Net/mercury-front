import React from 'react';
import { TokensIcon, ArrowRightIcon, ClockIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface PointsCardProps {
  points: number;
  title: string;
  description: string;
  icon: 'coins' | 'exchange' | 'history';
}

const iconMap = {
  coins: TokensIcon,
  exchange: ArrowRightIcon,
  history: ClockIcon,
};

const PointsCard: React.FC<PointsCardProps> = ({ points, title, description, icon }) => {
  const Icon = iconMap[icon];
  
  return (
    <div
      className={cn(
        "p-6 rounded-xl border border-gray-700",
        "bg-gray-900/60 backdrop-blur-md",
        "hover:transform hover:-translate-y-0.5 hover:shadow-lg",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-blue-500 text-white flex items-center justify-center">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex flex-col items-start space-y-1">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
          </div>
        </div>
        <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {points.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default PointsCard; 