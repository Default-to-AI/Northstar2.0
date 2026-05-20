import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useInvestorProfile } from '@/src/hooks/useInvestorProfile';
import { usePortfolioData } from '@/src/hooks/usePortfolioData';
import { Save, RotateCcw, Trash2 } from 'lucide-react';

export default function Profile() {
  const { profile, updateProfile } = useInvestorProfile();
  const { resetToSeed, setPositions } = usePortfolioData();

  const handleSave = () => {
    // Already saved via useEffect in hook
    console.log('Profile saved:', profile);
  };

  const handleReset = () => {
    if (confirm("Reset all holdings to default seed data? Current positions will be lost.")) {
      resetToSeed();
    }
  };

  const handleClear = () => {
    if (confirm("Clear ALL holdings? This cannot be undone.")) {
      setPositions([]);
    }
  };

  const computedVixRule = profile.maxPositionSize * (1 - (profile.positionSizeReduction / 100));

  const handleSliderChange = (field: keyof typeof profile) => (values: number[]) => {
    updateProfile({ [field]: values[0] });
  };

  return (
    <div className="p-4 space-y-4 max-w-[1000px] mx-auto overflow-y-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-mono text-primary uppercase tracking-tighter font-bold">Investor Configuration</h1>
        <Button onClick={handleSave} className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-[10px] font-bold px-4 h-8">
          <Save className="w-3 h-3 mr-2" /> SAVE PROFILE
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Capital & Position Sizing */}
        <Card className="rounded-none bg-background border-border terminal-border">
          <div className="p-2 px-3 border-b border-border bg-muted/10">
            <h2 className="label-text">Capital & Position Sizing</h2>
          </div>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-1">
              <label className="label-text text-[9px]">Active Capital ($)</label>
              <Input 
                type="number" 
                value={profile.activeCapital} 
                onChange={(e) => updateProfile({ activeCapital: Number(e.target.value) })}
                className="rounded-none border-border bg-background font-mono focus:border-primary transition-colors h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="label-text text-[9px]">Total Net Worth ($)</label>
              <Input 
                type="number" 
                value={profile.totalNetWorth} 
                onChange={(e) => updateProfile({ totalNetWorth: Number(e.target.value) })}
                className="rounded-none border-border bg-background font-mono h-8 text-xs"
              />
            </div>
            
            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center label-text">
                <label className="text-[9px]">Max Position Size</label>
                <span className="text-primary">{profile.maxPositionSize}%</span>
              </div>
              <Slider 
                value={[profile.maxPositionSize]} 
                min={1} 
                max={20} 
                step={0.5} 
                onValueChange={handleSliderChange('maxPositionSize')}
                className="text-primary"
              />
            </div>

            <div className="space-y-1">
              <label className="label-text text-[9px]">Minimum Position Size ($)</label>
              <Input 
                type="number" 
                value={profile.minPositionSize} 
                onChange={(e) => updateProfile({ minPositionSize: Number(e.target.value) })}
                className="rounded-none border-border bg-background font-mono h-8 text-xs"
              />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center label-text">
                <label className="text-[9px]">Cash Floor</label>
                <span className="text-primary">{profile.cashFloor}%</span>
              </div>
              <Slider 
                value={[profile.cashFloor]} 
                min={0} 
                max={30} 
                step={1} 
                onValueChange={handleSliderChange('cashFloor')}
              />
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex justify-between items-center label-text">
                <label className="text-[9px]">Default Stop-Loss</label>
                <span className="text-primary">{profile.defaultStopLoss}%</span>
              </div>
              <Slider 
                value={[profile.defaultStopLoss]} 
                min={1} 
                max={20} 
                step={0.5} 
                onValueChange={handleSliderChange('defaultStopLoss')}
              />
            </div>
          </CardContent>
        </Card>

        {/* VIX Regime Rules */}
        <div className="space-y-4">
          <Card className="rounded-none bg-background border-border terminal-border">
            <div className="p-2 px-3 border-b border-border bg-muted/10">
              <h2 className="label-text">VIX Regime Rules</h2>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center label-text">
                  <label className="text-[9px]">VIX Threshold</label>
                  <span className="text-primary">{profile.vixThreshold}</span>
                </div>
                <Slider 
                  value={[profile.vixThreshold]} 
                  min={15} 
                  max={40} 
                  step={1} 
                  onValueChange={handleSliderChange('vixThreshold')}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center label-text">
                  <label className="text-[9px]">Position Size Reduction</label>
                  <span className="text-primary">{profile.positionSizeReduction}%</span>
                </div>
                <Slider 
                  value={[profile.positionSizeReduction]} 
                  min={10} 
                  max={50} 
                  step={5} 
                  onValueChange={handleSliderChange('positionSizeReduction')}
                />
              </div>

              <div className="p-3 border border-border bg-[#14141d] font-mono text-[10px] leading-relaxed">
                <span className="text-muted-foreground uppercase block mb-1">Live Logic Preview:</span>
                Rule: if <span className="text-primary">VIX &gt; {profile.vixThreshold}</span>, max position size drops from <span className="text-foreground">{profile.maxPositionSize}%</span> to <span className="text-negative font-bold">{computedVixRule.toFixed(1)}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Conviction & Psychology */}
          <Card className="rounded-none bg-background border-border terminal-border">
            <div className="p-2 px-3 border-b border-border bg-muted/10">
              <h2 className="label-text">Conviction & Psychology</h2>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center label-text">
                  <label className="text-[9px]">Min Conviction Score</label>
                  <span className="text-primary">{profile.minConvictionScore} / 10</span>
                </div>
                <Slider 
                  value={[profile.minConvictionScore]} 
                  min={1} 
                  max={10} 
                  step={1} 
                  onValueChange={handleSliderChange('minConvictionScore')}
                />
              </div>

              <div className="space-y-1">
                <label className="label-text text-[9px]">Investor Psychology</label>
                <Select 
                  value={profile.psychology} 
                  onValueChange={(v: any) => updateProfile({ psychology: v })}
                >
                  <SelectTrigger className="rounded-none border-border bg-background font-mono focus:ring-0 focus:ring-offset-0 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-border bg-background font-mono">
                    <SelectItem value="Aggressive Accumulator">Aggressive Accumulator</SelectItem>
                    <SelectItem value="Conviction-Driven">Conviction-Driven</SelectItem>
                    <SelectItem value="Defensive">Defensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* System Controls */}
          <Card className="rounded-none bg-background border-border border-l-4 border-l-red-500/50 terminal-border">
            <div className="p-2 px-3 border-b border-border bg-muted/10">
              <h2 className="label-text">System Controls</h2>
            </div>
            <CardContent className="p-4 space-y-3">
               <p className="text-[10px] text-muted-foreground italic mb-2">
                 Dangerous operations. Backup your CSV before proceeding.
               </p>
               <div className="grid grid-cols-2 gap-3">
                 <Button 
                   variant="outline" 
                   onClick={handleReset}
                   className="rounded-none border-border bg-muted/5 text-muted-foreground hover:text-foreground h-9 text-[10px] font-bold uppercase tracking-widest"
                 >
                   <RotateCcw className="w-3 h-3 mr-2" /> Reset to Seeds
                 </Button>
                 <Button 
                   variant="outline" 
                   onClick={handleClear}
                   className="rounded-none border-red-500/20 bg-red-500/5 text-red-500 hover:bg-red-500/10 h-9 text-[10px] font-bold uppercase tracking-widest"
                 >
                   <Trash2 className="w-3 h-3 mr-2" /> Wipe Holdings
                 </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
