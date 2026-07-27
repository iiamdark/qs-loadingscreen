import { Slider } from "@/components/ui/slider"
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react"
import { Button } from "@/components/ui/button"

const AudioControls = ({ volume, setVolume, playerRef, isPlaying, setIsPlaying, isMuted, setIsMuted }) => {
    const toggleMute = () => {
        const newMuted = !isMuted
        setIsMuted(newMuted)
        if (playerRef?.current) {
            try {
                const internal = playerRef.current.getInternalPlayer()
                if (internal) {
                    internal.muted = newMuted
                }
            } catch (e) {
                // Internal player may not be ready yet
            }
        }
    }

    const handleVolumeChange = (newVolume) => {
        const volumeValue = newVolume[0]
        setVolume(volumeValue)
    }

    return (
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-card/80 p-2 rounded-lg backdrop-blur-sm border border-border/50">
            <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={1}
                min={0}
                step={0.01}
                className="w-24 h-2"
            />
        </div>
    )
}

export default AudioControls