export interface  Trip{
  trip_id: number;
  start:number;//between 0 and 24
  end:number;//between 0 and 24, must be greater than start
  bus_id: number;
  conflicts?: boolean;
}

export interface   Bus {  
  bus_id: number;
  trips: Trip[];
  conflicts?: boolean;
}



/* on initial paint:
 loop ove over buses, for each bus, loop over trips, for each trip, render a div with the trip info
 on draghover 
 if there are any conflicts, render the bus and the trips with conflicts in red
 reason for avoiding dealing with conflicts on drop, is that the inital data might have conflicts and we might want to edit the trips latear on which will create addional conflicts
 oerations: move trip
*/
