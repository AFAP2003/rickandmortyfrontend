'use client'
import { Card } from "@/components/shadcn-ui/card";
import { Badge } from "@/components/shadcn-ui/badge";
import CharacterApi from "@/lib/apis/character.api";
import { Character } from "@/lib/interfaces/character.interface";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, MapPin } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/shadcn-ui/dialog";
import { Button } from "@/components/shadcn-ui/button";
import { Label } from "@/components/shadcn-ui/label";
import { Input } from "@/components/shadcn-ui/input";
import { toast } from "@/hooks/use-toast";
import { assignCharacterToLocation, getCharacterLocation, getLocations } from "@/lib/local-storage";

export default function detailPage() {
const { characterDetail,isloading,  fetchCharacterById } = CharacterApi();
const params = useParams();
const characterId = params.slug?.[0]; 
const [locationName, setLocationName] = useState('');
const [isDialogOpen, setIsDialogOpen] = useState(false);
const [assignedLocation, setAssignedLocation] = useState(getCharacterLocation(characterId || ''));

useEffect(() => {
    if (characterId) {
      fetchCharacterById(characterId);
    }
  }, [characterId]);
const [character, setCharacter] = useState<Character | null>(null);
  if (!characterDetail) {
    return (
      <div className="min-h-screen w-full bg-[url('/space.png')] bg-cover bg-center p-6 flex items-center justify-center">
        <div className="text-white text-2xl">Character not found</div>
      </div>
    );
  }

   const handleAssignLocation = () => {
    if (!locationName.trim()) {
      toast.error('Please enter a location name');
      return;
    }

    const locations = getLocations();
    const existingLocation = locations.find(loc => loc.locationName.toLowerCase() === locationName.trim().toLowerCase());
    
    if (existingLocation && !existingLocation.characterIds.includes(id || '')) {
      // Location exists, adding character to it
      const success = assignCharacterToLocation(characterId || '', locationName.trim());
      if (success) {
        setAssignedLocation(locationName.trim());
        setIsDialogOpen(false);
        setLocationName('');
         toast({
          title: "Success",
          description: `Character assigned to ${locationName.trim()}`,
          status: "success",
        });
      }
    } else if (!existingLocation) {
      // Creating new location
      const success = assignCharacterToLocation(characterId || '', locationName.trim());
      if (success) {
        setAssignedLocation(locationName.trim());
        setIsDialogOpen(false);
        setLocationName('');
         toast({
          title: "Success",
          description: `New location created: ${locationName.trim()}`,
          status: "success",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Character already in this location",
        status: "error",
      });
      
    }
  };
  
  return (
    <div className="grid md:grid-cols-2 bg-[url('/space.png')] bg-cover bg-center bg-no-repeat gap-8 p-6">
        {/* Image Card */}
        <Card className="overflow-hidden bg-gradient-card border-border/50">
          <img 
            src={characterDetail.image} 
            alt={characterDetail.name}
            className="w-full aspect-square object-cover"
          />
        </Card>

        {/* Details Card */}
        <Card className="p-6 bg-black border-black text-white">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {characterDetail.name}
              </h1>
              <Badge className={` border-0`}>
                {characterDetail.status}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Species</p>
                <p className="text-foreground font-medium">{characterDetail.species}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Gender</p>
                <p className="text-foreground font-medium">{characterDetail.gender}</p>
              </div>
              {/* {characterDetail.type && (
                <div className="col-span-2">
                  <p className="text-muted-foreground">Type</p>
                  <p className="text-foreground font-medium">{characterDetail.type}</p>
                </div>
              )} */}
            </div>

            <div className="space-y-2 pt-4 border-t border-border/50">
              <div>
                <p className="text-muted-foreground text-sm">Origin</p>
                <p className="text-foreground">{characterDetail.origin.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Last known location</p>
                <p className="text-foreground">{characterDetail.location.name}</p>
              </div>
            </div>

            {/* Assigned Location */}
              {assignedLocation && (
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Assigned to</p>
                  <p className="text-foreground font-medium">{assignedLocation}</p>
                </div>
              </div>
            )}
            

            {/* Assign Location Button */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-portal">
                  <MapPin className="w-4 h-4 mr-2" />
                  {assignedLocation ? 'Change Location' : 'Assign to Location'}
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border/50">
                <DialogHeader>
                  <DialogTitle>Assign Character to Location</DialogTitle>
                  <DialogDescription>
                    Enter a location name. If the location doesn't exist, it will be created.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location Name</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Earth C-137"
                      value={locationName}
                      onChange={(e) => setLocationName(e.target.value)}
                      className="bg-background border-border/50"
                      onKeyPress={(e) => e.key === 'Enter' && handleAssignLocation()}
                    />
                  </div>
                  <Button 
                    onClick={handleAssignLocation}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Assign Location
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>
      </div> 
)
}