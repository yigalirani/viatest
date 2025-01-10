import type { Trip,Bus } from 'server';
async function getcontent(url:string) {
  const response = await fetch(url);
  return await response.json();
}
function calc_conflicts(bus:Bus){
  bus.trips.sort((a,b)=>a.start-b.start);
  let last_trip=bus.trips[0]!;
  for (const trip of bus.trips.slice(1,-1)){
    if (trip.start<last_trip.end){
      trip.conflicts=true;
      bus.conflicts=true;
    }
    last_trip=trip;
  }
  return bus
}
function  calc_buses(trips:Trip[]): Bus[]{
  const ans:Record<number,Bus> = {}
  for (const trip of trips){
    const bus:Bus= ans[trip.bus_id] || {bus_id: trip.bus_id, trips: []}
    ans[trip.bus_id] = bus
    bus.trips.push(trip)
  }
  return Object.values(ans).map(calc_conflicts).sort((a,b)=>a.bus_id-b.bus_id)
}
function conflict_class(conflicts:boolean|undefined){
  if (conflicts===true)
    return ' conflicts'
  return ''
}
function percent(a:number){
  return `${a/24*100}%`
}
function render_trip(trip:Trip){
  const {trip_id,start,end,conflicts}=trip;
  return `<div style="left:${percent(start)};width:${percent(end-start)}" draggable=true class='trip${conflict_class(conflicts)}'>${trip_id}</div>`
}

function render_bus(bus:Bus){
  const {bus_id,trips,conflicts}=bus
  const rendered_trips=trips.map(render_trip).join('\n')
  return `<tr class=bus><td>${bus_id}</td><td class='bus${conflict_class(conflicts)}' id=bus${bus_id}>${rendered_trips}</td></tr>`
}

async function run_app(){
  const body = document.querySelector('body');
  if (!body)
    return
  const trips = await getcontent('/get_trips') as Trip[]; //todo: validated that ineed formated as Trips?
  const buses = calc_buses(trips);
  console.log(buses)
  const buses_rows= buses.map(render_bus).join('\n')  
  const html=`<table class=container>${buses_rows}</table>`
  body.innerHTML = html;
}
run_app()