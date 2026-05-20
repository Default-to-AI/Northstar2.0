import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import Papa from 'papaparse';
import { Position } from '../types';
import { fetchSector } from '../lib/finnhub';

interface CsvImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (positions: Position[]) => void;
}

export function CsvImportDialog({ open, onOpenChange, onImport }: CsvImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [csvText, setCsvText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [mode, setMode] = useState<'FILE' | 'TEXT'>('FILE');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setCsvText("");
      setError(null);
      
      Papa.parse(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setPreview(results.data.slice(0, 5));
        },
        error: (err) => {
          setError(`Parsing error: ${err.message}`);
        }
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCsvText(text);
    setFile(null);
    setError(null);

    if (text.trim()) {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setPreview(results.data.slice(0, 5));
        }
      });
    } else {
      setPreview([]);
    }
  };

  const handleImport = async () => {
    if (!file && !csvText) return;

    setLoading(true);
    setError(null);

    const parseSource = file || csvText;
    Papa.parse(parseSource as any, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rawData = results.data as any[];
          const newPositions: Position[] = [];

          for (const row of rawData) {
            const ticker = row.Ticker || row.ticker || row.symbol || row.Symbol;
            const shares = parseFloat(row.shares || row.Shares || row.quantity || row.Quantity || row.qty);
            const avgCost = parseFloat(row['avg position price'] || row['Avg Price'] || row.avgPrice || row['avg cost'] || row.avgCost);
            const lastPrice = parseFloat(row['last price'] || row['Last Price'] || row.lastPrice);
            
            if (!ticker || isNaN(shares) || isNaN(avgCost)) {
              console.warn('Skipping invalid row:', row);
              continue;
            }

            // Fetch sector for each stock
            const sector = await fetchSector(ticker.toUpperCase());

            newPositions.push({
              id: Math.random().toString(36).substr(2, 9),
              ticker: ticker.toUpperCase(),
              shares,
              avgCost,
              currentPrice: isNaN(lastPrice) ? undefined : lastPrice,
              sector,
              thesis: ""
            });
          }

          if (newPositions.length === 0) {
            setError("No valid positions found. Check column headers (Ticker/Symbol, shares/quantity, avg cost).");
            setLoading(false);
            return;
          }

          onImport(newPositions);
          setLoading(false);
          onOpenChange(false);
          setFile(null);
          setCsvText("");
          setPreview([]);
        } catch (err) {
          setError("Error processing data. Please try again.");
          setLoading(false);
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-[#0d0d14] border-border font-mono p-0 overflow-hidden">
        <DialogHeader className="p-6 border-b border-border bg-muted/10">
          <DialogTitle className="text-xl font-bold text-primary tracking-tighter uppercase italic flex items-center gap-2">
            <Upload size={20} /> Import Portfolio
          </DialogTitle>
          <DialogDescription className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold opacity-60">
            Upload a CSV or paste raw data to overwrite your current holdings
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="flex border border-border/40 overflow-hidden">
            <button 
              onClick={() => setMode('FILE')}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === 'FILE' ? 'bg-primary text-black' : 'bg-muted/5 text-muted-foreground hover:bg-muted/10'}`}
            >
              Upload File
            </button>
            <button 
              onClick={() => setMode('TEXT')}
              className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${mode === 'TEXT' ? 'bg-primary text-black' : 'bg-muted/5 text-muted-foreground hover:bg-muted/10'}`}
            >
              Paste Text
            </button>
          </div>

          <div className="space-y-4">
            {mode === 'FILE' ? (
              <div className="border-2 border-dashed border-border p-8 text-center bg-muted/5 hover:bg-muted/10 transition-colors relative cursor-pointer group">
                <input 
                  type="file" 
                  accept=".csv" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-3">
                  <FileText className={`w-8 h-8 ${file ? 'text-primary' : 'text-muted-foreground opacity-40'}`} />
                  <div className="text-[11px] uppercase font-bold tracking-tight">
                    {file ? file.name : "Select or Drop CSV File"}
                  </div>
                  <div className="text-[9px] text-muted-foreground opacity-60">
                    Required columns: Ticker, shares, avg cost
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <textarea 
                  value={csvText}
                  onChange={handleTextChange}
                  placeholder="symbol,quantity,avg cost&#10;AAPL,10,185.20&#10;TSLA,5,240.10"
                  className="w-full h-40 bg-background/50 border border-border p-3 text-[11px] focus:outline-none focus:border-primary/50 text-foreground"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] flex items-start gap-2">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {preview.length > 0 && !error && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-green-500" /> Data Preview (First {preview.length} rows)
                </label>
                <div className="border border-border/40 bg-black/20 overflow-x-auto">
                  <table className="w-full text-[9px] font-mono">
                    <thead>
                      <tr className="border-b border-border/20 bg-muted/5 text-muted-foreground text-left">
                        {Object.keys(preview[0]).map(k => (
                          <th key={k} className="p-2 font-bold uppercase">{k}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, i) => (
                        <tr key={i} className="border-b border-border/10 last:border-0">
                          {Object.values(row).map((v: any, j) => (
                            <td key={j} className="p-2 text-foreground/80">{v}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-6 border-t border-border bg-muted/10">
          <Button 
            variant="ghost" 
            onClick={() => onOpenChange(false)}
            className="rounded-none font-bold uppercase text-[10px] tracking-widest"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleImport}
            disabled={!file || loading}
            className="rounded-none bg-primary text-black font-bold uppercase tracking-widest text-[11px] h-10 px-8 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="mr-2 animate-spin" /> Processing...
              </>
            ) : "Confirm & Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
