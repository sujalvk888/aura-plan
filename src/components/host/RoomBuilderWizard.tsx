'use client'

import { useState } from 'react';
import { upload } from '@vercel/blob/client';
import { ArrowRight, Save, Image as ImageIcon } from 'lucide-react';
import DualViewRoom from '@/components/3d/DualViewRoom';
import { addRoom, editRoom } from '@/app/host/dashboard/properties/[id]/rooms/actions';
import { Room } from '@prisma/client';

interface WizardProps {
  propertyId: string;
  roomId?: string;
  initialRoom?: Room | null;
}

export default function RoomBuilderWizard({ propertyId, roomId, initialRoom }: WizardProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Client-side preview state
  const [dimensions, setDimensions] = useState({ 
    width: initialRoom?.width || 10, 
    length: initialRoom?.length || 10, 
    height: initialRoom?.height || 10 
  });
  
  // Calculate ft and in from decimal viewingHeight
  const initViewHeightDecimal = initialRoom?.viewingHeight || 5.916666666666667;
  const initViewFt = Math.floor(initViewHeightDecimal);
  const initViewIn = Math.round((initViewHeightDecimal - initViewFt) * 12);

  const [viewHeight, setViewHeight] = useState({ ft: initViewFt, in: initViewIn });
  const [roomName, setRoomName] = useState(initialRoom?.name || 'Living Room');
  
  const [surfacePreviews, setSurfacePreviews] = useState({
    front: initialRoom?.front || '', 
    back: initialRoom?.back || '', 
    left: initialRoom?.left || '', 
    right: initialRoom?.right || '', 
    ceiling: initialRoom?.ceiling || '', 
    floor: initialRoom?.floor || ''
  });

  const [filesToUpload, setFilesToUpload] = useState<Record<string, File | null>>({
    front: null, back: null, left: null, right: null, ceiling: null, floor: null
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, surface: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSurfacePreviews(prev => ({ ...prev, [surface]: url }));
      setFilesToUpload(prev => ({ ...prev, [surface]: file }));
    }
  };

  const formAction = roomId 
    ? editRoom.bind(null, propertyId, roomId) 
    : addRoom.bind(null, propertyId);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const surfaces = ['front', 'back', 'left', 'right', 'ceiling', 'floor'];
    
    try {
      for (const surface of surfaces) {
        const file = filesToUpload[surface];
        if (file) {
          const ext = file.name.split('.').pop() || 'png';
          const filename = `rooms/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
          
          const newBlob = await upload(filename, file, {
            access: 'public',
            handleUploadUrl: '/api/upload',
          });
          
          formData.set(`${surface}ImageUrl`, newBlob.url);
        }
        formData.delete(`${surface}Image`);
      }
      
      await formAction(formData);
    } catch (err) {
      // Ignore NEXT_REDIRECT errors, but log others
      if (!(err instanceof Error && err.message.includes('NEXT_REDIRECT'))) {
        console.error('Upload failed:', err);
        setIsSubmitting(false);
      } else {
        throw err; // Re-throw the redirect error so Next.js handles it
      }
    }
  };

  const currentViewHeight = dimensions.height > 0 ? (viewHeight.ft + (viewHeight.in / 12)) : 0;

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-8 ${step >= 3 ? 'lg:flex-row h-[calc(100vh-140px)]' : 'items-center'}`}>
      
      {/* Left Sidebar Form */}
      <div className={`w-full flex flex-col gap-6 ${step >= 3 ? 'h-full overflow-y-auto custom-scrollbar lg:w-1/3 pr-4' : 'max-w-2xl'}`}>
        
        {/* Step 1: Dimensions */}
        <div className={`p-8 rounded-2xl border bg-surface border-primary/50 shadow-lg transition-colors w-full ${step !== 1 ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">1. Room Dimensions</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Room Name</label>
              <input type="text" name="name" value={roomName} onChange={e => setRoomName(e.target.value)} required className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="Living Room" />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-2">Width (ft)</label>
                <input type="number" name="width" value={dimensions.width} onChange={e => setDimensions(d => ({ ...d, width: Number(e.target.value) }))} required min="1" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-2">Length (ft)</label>
                <input type="number" name="length" value={dimensions.length} onChange={e => setDimensions(d => ({ ...d, length: Number(e.target.value) }))} required min="1" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-foreground-muted mb-2">Height (ft)</label>
                <input type="number" name="height" value={dimensions.height} onChange={e => setDimensions(d => ({ ...d, height: Number(e.target.value) }))} required min="1" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-3 mt-6">Viewer Eye Level (Inside Room)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <input type="number" name="viewHeightFt" value={viewHeight.ft} onChange={e => setViewHeight(v => ({ ...v, ft: Number(e.target.value) }))} required min="0" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
                  <span className="text-sm text-foreground-muted">ft</span>
                </div>
                <div className="flex items-center gap-3">
                  <input type="number" name="viewHeightIn" value={viewHeight.in} onChange={e => setViewHeight(v => ({ ...v, in: Number(e.target.value) }))} required min="0" max="11" className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-primary" />
                  <span className="text-sm text-foreground-muted">in</span>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button type="button" onClick={() => setStep(2)} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl transition-colors font-medium shadow-lg shadow-primary/20">
                Continue to Surfaces <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Step 2: Upload Surfaces */}
        <div className={`p-8 rounded-2xl border bg-surface border-primary/50 shadow-lg transition-colors w-full ${step !== 2 ? 'hidden' : ''}`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-semibold text-foreground">2. Room Surfaces</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-sm text-foreground-muted mb-6">Upload the 6 images that will make up the interior walls of this room.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['front', 'back', 'left', 'right', 'ceiling', 'floor'].map((surface) => (
                <div key={surface} className="relative overflow-hidden rounded-xl border border-white/10 bg-background flex items-center">
                  <div className="w-16 h-16 bg-white/5 flex-shrink-0 border-r border-white/10 flex items-center justify-center">
                    {surfacePreviews[surface as keyof typeof surfacePreviews] ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={surfacePreviews[surface as keyof typeof surfacePreviews]} alt={surface} className="w-full h-full object-cover" />
                      </>
                    ) : (
                      <ImageIcon size={20} className="text-foreground-muted/50" />
                    )}
                  </div>
                  <div className="flex-1 px-4 py-2">
                    <span className="block text-sm font-medium capitalize mb-1">{surface}</span>
                    <input 
                      type="file" 
                      name={`${surface}Image`} 
                      accept="image/*" 
                      onChange={(e) => handleImageChange(e, surface)}
                      className="text-xs text-foreground-muted w-full file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-white/10 file:text-foreground hover:file:bg-white/20 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>

            {Object.values(surfacePreviews).some(url => url === '') && (
              <p className="text-red-400 text-xs mt-4 text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20">Please upload all 6 surfaces to continue.</p>
            )}
            
            <div className="pt-4 space-y-3">
              <button type="button" disabled={Object.values(surfacePreviews).some(url => url === '')} onClick={() => setStep(3)} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                Generate Previews <ArrowRight size={18} />
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-foreground py-3.5 rounded-xl font-medium transition-colors">
                Back to Dimensions
              </button>
            </div>
          </div>
        </div>
        
        {/* Step 3: Publish */}
        <div className={`p-6 rounded-2xl bg-surface border border-primary/50 shadow-lg ${step !== 3 ? 'hidden' : ''}`}>
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">3. Review & Save</h2>
          <p className="text-sm text-foreground-muted mb-6">Review the generated room in the viewer. If everything looks correct, save the room to your workspace.</p>
          
          <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-foreground py-3.5 rounded-xl font-medium transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
            {isSubmitting ? 'Saving Room...' : <><Save size={18} /> Save Room to Workspace</>}
          </button>

          <button type="button" onClick={() => setStep(2)} className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-foreground py-3.5 rounded-xl font-medium transition-colors mt-4">
            Back to Edit Surfaces
          </button>
        </div>

      </div>

      {/* Right Side 3D Preview (Only visible in step 3) */}
      {step >= 3 && (
        <div className="w-full lg:w-2/3 h-full">
          <DualViewRoom roomData={{
            width: dimensions.width,
            length: dimensions.length,
            height: dimensions.height,
            viewingHeight: currentViewHeight,
            front: surfacePreviews.front,
            back: surfacePreviews.back,
            left: surfacePreviews.left,
            right: surfacePreviews.right,
            ceiling: surfacePreviews.ceiling,
            floor: surfacePreviews.floor
          }} />
        </div>
      )}

    </form>
  );
}
