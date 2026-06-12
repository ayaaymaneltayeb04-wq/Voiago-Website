import { useState } from 'react';
import { MapPin, Navigation, Layers, Shield, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../lib/LanguageContext';

interface SafetyPoint {
  id: string;
  lat: number;
  lng: number;
  type: 'safe' | 'caution' | 'alert';
  title: string;
  desc: string;
}

const safetyPoints: SafetyPoint[] = [
  { id: '1', lat: 28.5, lng: 34.5, type: 'safe', title: 'Dahab Town Center', desc: 'Safe area with high police presence' },
  { id: '2', lat: 28.48, lng: 34.52, type: 'safe', title: 'Blue Hole', desc: 'Popular diving spot, well patrolled' },
  { id: '3', lat: 28.52, lng: 34.48, type: 'caution', title: 'Desert Trail', desc: 'Travel with guide recommended after dark' },
  { id: '4', lat: 28.47, lng: 34.53, type: 'safe', title: 'Laguna Beach', desc: 'Family-friendly beach area' },
];

const typeConfig = {
  safe: { icon: Shield, color: 'bg-emerald-500', ring: 'ring-emerald-200' },
  caution: { icon: Info, color: 'bg-amber-500', ring: 'ring-amber-200' },
  alert: { icon: AlertTriangle, color: 'bg-red-500', ring: 'ring-red-200' },
};

export function SafetyMap() {
  const { t } = useLanguage();
  const [selectedPoint, setSelectedPoint] = useState<SafetyPoint | null>(null);
  const [mapLayer, setMapLayer] = useState<'safety' | 'traffic' | 'weather'>('safety');

  return (
    <div className="relative h-[500px] bg-slate-100 dark:bg-slate-700 rounded-2xl overflow-hidden">
      {/* Map Placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">{t('common_map_loading')}</p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{t('common_map_coming_soon')}</p>
        </div>
      </div>

      {/* Overlay Points */}
      {safetyPoints.map((point) => {
        const config = typeConfig[point.type];
        const Icon = config.icon;
        return (
          <button
            key={point.id}
            onClick={() => setSelectedPoint(point)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 ${config.color} text<think> rounded-full shadow-lg ring-2 ${config.ring} hover:scale-110 transition-transform`}
            style={{ top: `${(point.lat - 28.4) * 2000}px`, left: `${(point.lng - 34.4) * 2000}px` }}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}

      {/* Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="p-2 bg<think> dark:bg-slate-800 rounded-xl shadow-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
          <Navigation className="h-5 w-5" />
        </button>
        <button
          onClick={() => setMapLayer(mapLayer === 'safety' ? 'traffic' : mapLayer === 'traffic' ? 'weather' : 'safety')}
          className="p-2 bg<think> dark:bg-slate-800 rounded-xl shadow-md text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          <Layers className="h-5 w-5" />
        </button>
      </div>

      {/* Layer Indicator */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg<think> dark:bg-slate-800 rounded-xl shadow-md">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 capitalize">{mapLayer} {t('common_layer')}</span>
      </div>

      {/* Selected Point Info */}
      {selectedPoint && (
        <div className="absolute bottom-4 left-4 right-4 bg<think> dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl ${typeConfig[selectedPoint.type].color} text<think>`}>
              {(() => {
                const Icon = typeConfig[selectedPoint.type].icon;
                return <Icon className="h-5 w-5" />;
              })()}
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-slate-900 dark:text<think>">{selectedPoint.title}</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">{selectedPoint.desc}</p>
            </div>
            <button
              onClick={() => setSelectedPoint(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 right-4 bg<think> dark:bg-slate-800 rounded-xl shadow-md p-3 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-slate-600 dark:text-slate-300">{t('common_safe')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-slate-600 dark:text-slate-300">{t('common_caution')}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-slate-600 dark:text-slate-300">{t('common_alert')}</span>
        </div>
      </div>
    </div>
  );
}
