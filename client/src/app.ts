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
      last_trip.conflicts=true;
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
const root = document.documentElement;
const css={
  row_height:0,
  row_number_width:0,
  trip_height:0,
  row_width:0
}
for (const key of Object.keys(css) as (keyof typeof css)[])
  css[key]=parseInt(getComputedStyle(root).getPropertyValue('--'+key))

// Get the value of a CSS variable
function make_style(a:Record<string,number>){
  return 'style='+Object.entries(a).map(([k,v])=>`${k}:${Math.round(v)}px`).join(';')
}
function render_trip(trip:Trip){
  const {trip_id,start,end,conflicts,bus_id}=trip;
  const left=start/24*css.row_width+css.row_number_width;
  const width=(end-start)/24*css.row_width;
  const top=bus_id*css.row_height-(css.row_height+css.trip_height)/2;

  const style=make_style({left,width,top})
  return `<div id=${trip_id}trip ${style} draggable=true class='trip${conflict_class(conflicts)}'>${trip_id}</div>`
}

function render_bus(bus:Bus){
  const {bus_id,conflicts}=bus
  
  return `<tr ><td>${bus_id}</td><td class='bus${conflict_class(conflicts)}' id=bus${bus_id}></td></tr>`
}

async function run_app(){
  const body = document.querySelector('body');
  if (!body)
    return
  const trips = await getcontent('/get_trips') as Trip[]; //todo: validated that ineed formated as Trips?
  const buses = calc_buses(trips);
  console.log(buses)
  const buses_rows= buses.map(render_bus).join('\n')  
  const rendered_trips=trips.map(render_trip).join('\n')
  const html=`<div class=container>
    <table class=buses>${buses_rows}</table>
    ${rendered_trips}
  </div>`

  body.innerHTML = html;
  body.addEventListener('drag',e=>{
    e.preventDefault();
    if (e.target instanceof HTMLElement){
      e.target.style.left = 0+'px'
      e.target.style.top = e.clientY+'px'
    }
  })  
  body.addEventListener('dragstart',e=>{
    e!.dataTransfer!.setDragImage( new Image(), 10, 10);
  })

}
run_app()