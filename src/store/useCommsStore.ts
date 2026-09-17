import { create } from 'zustand';

export type EquipmentStatus = 'SERVICEABLE' | 'NOT SERVICEABLE' | 'UNDER MAINTENANCE';
export type EventType = 'DEPARTURE' | 'ARRIVAL' | 'GROUND' | 'OVERFLIGHT' | 'HANDOVER' | 'COMM_CHECK' | 'EMERGENCY';
export type FlightType = 'DEP' | 'ARR' | 'OVER';
export type FilingType = 'IFR' | 'VFR';
export type FlightStatus = 'FILED' | 'RECEIVED' | 'ACTIVE' | 'CLOSED' | 'DELAYED';
export type ReportPriority = 'HIGH' | 'MEDIUM' | 'LOW';
export type ActiveTab = 'dashboard' | 'communications' | 'flight-plans' | 'events' | 'equipment' | 'reports';

export interface EquipmentItem {
  id: string;
  name: string;
  frequency?: string;
  status: EquipmentStatus;
  category: 'RADIO_TX' | 'RADIO_RX' | 'RECORDER' | 'DATA_TERMINAL' | 'ENCODER' | 'POWER' | 'COMM_LINK';
  location: string;
  lastChecked: string;
  healthScore: number;
  notes?: string;
}

export interface Frequencies {
  twrRx: string;
  twrTx: string;
  gndRx: string;
  appRx: string;
  emerg: string;
  atis: string;
}

export interface AirTrafficEvent {
  id: string;
  time: string;
  station: 'TWR' | 'GND' | 'APP' | 'ACC' | 'EMG';
  callSign: string;
  originDest: string;
  eventType: EventType;
  details: string;
}

export interface FlightPlan {
  id: string;
  time: string;
  callSign: string;
  type: FlightType;
  filingType: FilingType;
  route: string;
  status: FlightStatus;
  aircraftType?: string;
  altitude?: string;
}

export interface PendingReport {
  id: string;
  title: string;
  timestamp: string;
  priority: ReportPriority;
  category: string;
  details: string;
  status: 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED';
  filedBy: string;
}

interface CommsState {
  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Frequencies
  frequencies: Frequencies;
  setFrequency: (key: keyof Frequencies, val: string) => void;

  // Equipment (Status requirement: SERVICEABLE / NOT SERVICEABLE / UNDER MAINTENANCE)
  equipment: EquipmentItem[];
  toggleEquipmentStatus: (id: string) => void;
  updateEquipmentStatus: (id: string, status: EquipmentStatus, notes?: string) => void;
  addEquipment: (item: Omit<EquipmentItem, 'id' | 'lastChecked' | 'healthScore'>) => void;

  // Air Traffic Live Log
  events: AirTrafficEvent[];
  addTrafficEvent: (event: Omit<AirTrafficEvent, 'id' | 'time'>) => void;

  // Flight Plans
  flightPlans: FlightPlan[];
  addFlightPlan: (plan: Omit<FlightPlan, 'id' | 'time'>) => void;
  updateFlightPlanStatus: (id: string, status: FlightStatus) => void;

  // Pending Reports
  reports: PendingReport[];
  addReport: (report: Omit<PendingReport, 'id' | 'timestamp' | 'status'>) => void;
  resolveReport: (id: string) => void;

  // Modals & Drawers
  isChangeFreqModalOpen: boolean;
  setChangeFreqModalOpen: (open: boolean) => void;
  isNewEventModalOpen: boolean;
  setNewEventModalOpen: (open: boolean) => void;
  isNewReportModalOpen: boolean;
  setNewReportModalOpen: (open: boolean) => void;
  isNewFlightPlanModalOpen: boolean;
  setNewFlightPlanModalOpen: (open: boolean) => void;
  selectedEquipmentId: string | null;
  setSelectedEquipmentId: (id: string | null) => void;

  // Simulation
  triggerEmergencyAlert: (callSign: string, station: string, details: string) => void;
}

const initialEquipment: EquipmentItem[] = [
  {
    id: 'eq-1',
    name: 'VHF Transmitter (118.700)',
    frequency: '118.700 MHz',
    status: 'SERVICEABLE',
    category: 'RADIO_TX',
    location: 'Main Tower Equipment Bay R-01',
    lastChecked: 'Today 08:30 UTC',
    healthScore: 99,
    notes: 'Transmitter RF power nominal at 50W. VSWR 1.1:1.'
  },
  {
    id: 'eq-2',
    name: 'VHF Receiver (118.700)',
    frequency: '118.700 MHz',
    status: 'SERVICEABLE',
    category: 'RADIO_RX',
    location: 'Main Tower Equipment Bay R-02',
    lastChecked: 'Today 08:30 UTC',
    healthScore: 97,
    notes: 'Squelch sensitivity calibrated. Noise floor nominal.'
  },
  {
    id: 'eq-3',
    name: 'HF Transceiver',
    frequency: '8.879 MHz / 5.649 MHz',
    status: 'SERVICEABLE',
    category: 'RADIO_TX',
    location: 'HF Radio Site Tower Annex',
    lastChecked: 'Today 07:15 UTC',
    healthScore: 95,
    notes: 'High Frequency ocean link online with clear readability.'
  },
  {
    id: 'eq-4',
    name: 'Voice Recorder (VCS)',
    frequency: 'Multi-Channel Digital',
    status: 'SERVICEABLE',
    category: 'RECORDER',
    location: 'Master Control Server Room',
    lastChecked: 'Today 06:00 UTC',
    healthScore: 100,
    notes: 'Synchronized 32-channel audio archive active.'
  },
  {
    id: 'eq-5',
    name: 'Flight Data Terminal (FDT)',
    frequency: 'LAN Direct',
    status: 'SERVICEABLE',
    category: 'DATA_TERMINAL',
    location: 'Tower Operations Desk Console 2',
    lastChecked: 'Today 09:00 UTC',
    healthScore: 98,
    notes: 'Direct feed from ACC radar processor established.'
  },
  {
    id: 'eq-6',
    name: 'ATIS Encoder',
    frequency: '127.400 MHz',
    status: 'UNDER MAINTENANCE',
    category: 'ENCODER',
    location: 'METCOM Interface Bay',
    lastChecked: 'Yesterday 18:45 UTC',
    healthScore: 64,
    notes: 'Synthetic voice module undergoing firmware update.'
  },
  {
    id: 'eq-7',
    name: 'Backup Power System',
    frequency: '230V / 50Hz UPS & Gen',
    status: 'SERVICEABLE',
    category: 'POWER',
    location: 'Power Substation Unit 3',
    lastChecked: 'Today 04:00 UTC',
    healthScore: 100,
    notes: 'Battery bank charged 100%. Auto-genset fuel 94%.'
  },
  {
    id: 'eq-8',
    name: 'VSAT Satellite Link',
    frequency: 'C-Band Aviation Link',
    status: 'SERVICEABLE',
    category: 'COMM_LINK',
    location: 'Roof Antenna Farm Site B',
    lastChecked: 'Today 02:30 UTC',
    healthScore: 96,
    notes: 'NAMA regional VSAT network lock confirmed.'
  },
  {
    id: 'eq-9',
    name: 'ILS Localizer Signal Monitor',
    frequency: '109.900 MHz',
    status: 'NOT SERVICEABLE',
    category: 'RADIO_RX',
    location: 'Runway 24 Approach Station',
    lastChecked: 'Today 00:15 UTC',
    healthScore: 42,
    notes: 'Field monitor sensor signal degraded. Technicians dispatched.'
  }
];

const initialEvents: AirTrafficEvent[] = [
  {
    id: 'evt-1',
    time: '14:31:52',
    station: 'TWR',
    callSign: 'PAL123',
    originDest: 'RPLL',
    eventType: 'DEPARTURE',
    details: 'RWY 24 Cleared for Takeoff'
  },
  {
    id: 'evt-2',
    time: '14:30:11',
    station: 'TWR',
    callSign: 'CEB456',
    originDest: 'RPVM',
    eventType: 'ARRIVAL',
    details: 'RWY 24 Cleared to Land'
  },
  {
    id: 'evt-3',
    time: '14:28:45',
    station: 'GND',
    callSign: 'SIA789',
    originDest: 'WSSS',
    eventType: 'GROUND',
    details: 'Taxi to Holding Point RWY 06'
  },
  {
    id: 'evt-4',
    time: '14:27:33',
    station: 'TWR',
    callSign: 'JAL012',
    originDest: 'RJAA',
    eventType: 'OVERFLIGHT',
    details: 'Passing FL180 on Direct Route'
  },
  {
    id: 'evt-5',
    time: '14:25:18',
    station: 'APP',
    callSign: 'CPA345',
    originDest: 'VHHH',
    eventType: 'HANDOVER',
    details: 'Handover to Approach Control 124.700'
  },
  {
    id: 'evt-6',
    time: '14:20:04',
    station: 'TWR',
    callSign: 'NGA901',
    originDest: 'DNMM -> DNAA',
    eventType: 'COMM_CHECK',
    details: 'Radio check 5x5 on 118.700 MHz'
  }
];

const initialFlightPlans: FlightPlan[] = [
  {
    id: 'fp-1',
    time: '14:10:22',
    callSign: 'PAL123',
    type: 'DEP',
    filingType: 'IFR',
    route: 'RPLL SID LUZON5',
    status: 'FILED',
    aircraftType: 'A330-900',
    altitude: 'FL380'
  },
  {
    id: 'fp-2',
    time: '13:58:37',
    callSign: 'CEB456',
    type: 'ARR',
    filingType: 'IFR',
    route: 'RPVM STAR MABAL',
    status: 'RECEIVED',
    aircraftType: 'A320neo',
    altitude: 'FL240'
  },
  {
    id: 'fp-3',
    time: '13:45:09',
    callSign: 'SIA789',
    type: 'DEP',
    filingType: 'IFR',
    route: 'WSSS SID TEBAN',
    status: 'FILED',
    aircraftType: 'B787-10',
    altitude: 'FL400'
  },
  {
    id: 'fp-4',
    time: '13:30:51',
    callSign: 'JAL012',
    type: 'OVER',
    filingType: 'IFR',
    route: 'RJAA DCT',
    status: 'RECEIVED',
    aircraftType: 'B777-300ER',
    altitude: 'FL350'
  },
  {
    id: 'fp-5',
    time: '13:15:33',
    callSign: 'CPA345',
    type: 'ARR',
    filingType: 'IFR',
    route: 'VHHH STAR LAMPI',
    status: 'FILED',
    aircraftType: 'A350-1000',
    altitude: 'FL280'
  }
];

const initialReports: PendingReport[] = [
  {
    id: 'rep-1',
    title: 'Communication Failure Log',
    timestamp: '21 May 2024 13:40 UTC',
    priority: 'HIGH',
    category: 'VHF Radio',
    details: 'Transient interference detected on secondary 124.7 MHz frequency during approach handover.',
    status: 'PENDING',
    filedBy: 'COMMS Officer Okon (NAMA)'
  },
  {
    id: 'rep-2',
    title: 'Equipment Status Report',
    timestamp: '21 May 2024 12:15 UTC',
    priority: 'MEDIUM',
    category: 'Routine Maintenance',
    details: 'ATIS encoder firmware update in progress. Voice generator replacement scheduled.',
    status: 'UNDER_REVIEW',
    filedBy: 'Sr. Eng. Danjuma'
  },
  {
    id: 'rep-3',
    title: 'Air Traffic Summary Report',
    timestamp: '21 May 2024 00:00 UTC',
    priority: 'LOW',
    category: 'Shift Handover',
    details: 'Daily summary log of 152 movements and zero safety-critical comms blackouts.',
    status: 'RESOLVED',
    filedBy: 'Shift Supervisor Adebayo'
  }
];

export const useCommsStore = create<CommsState>((set) => ({
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  frequencies: {
    twrRx: '118.700',
    twrTx: '118.100',
    gndRx: '121.900',
    appRx: '124.700',
    emerg: '121.500',
    atis: '127.400'
  },
  setFrequency: (key, val) => set((state) => ({
    frequencies: { ...state.frequencies, [key]: val }
  })),

  equipment: initialEquipment,
  toggleEquipmentStatus: (id) => set((state) => ({
    equipment: state.equipment.map((item) => {
      if (item.id === id) {
        let nextStatus: EquipmentStatus = 'SERVICEABLE';
        if (item.status === 'SERVICEABLE') nextStatus = 'NOT SERVICEABLE';
        else if (item.status === 'NOT SERVICEABLE') nextStatus = 'UNDER MAINTENANCE';
        else nextStatus = 'SERVICEABLE';

        return {
          ...item,
          status: nextStatus,
          lastChecked: `Just Now (${new Date().toISOString().substring(11, 19)} UTC)`,
          healthScore: nextStatus === 'SERVICEABLE' ? 98 : (nextStatus === 'UNDER MAINTENANCE' ? 60 : 20)
        };
      }
      return item;
    })
  })),
  updateEquipmentStatus: (id, status, notes) => set((state) => ({
    equipment: state.equipment.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status,
          notes: notes !== undefined ? notes : item.notes,
          lastChecked: `Updated (${new Date().toISOString().substring(11, 19)} UTC)`,
          healthScore: status === 'SERVICEABLE' ? 99 : (status === 'UNDER MAINTENANCE' ? 65 : 15)
        };
      }
      return item;
    })
  })),
  addEquipment: (item) => set((state) => ({
    equipment: [
      {
        ...item,
        id: `eq-${Date.now()}`,
        lastChecked: `New (${new Date().toISOString().substring(11, 19)} UTC)`,
        healthScore: item.status === 'SERVICEABLE' ? 100 : 50
      },
      ...state.equipment
    ]
  })),

  events: initialEvents,
  addTrafficEvent: (newEvent) => {
    const timeStr = new Date().toISOString().substring(11, 19);
    const item: AirTrafficEvent = {
      ...newEvent,
      id: `evt-${Date.now()}`,
      time: timeStr
    };
    set((state) => ({ events: [item, ...state.events] }));
  },

  flightPlans: initialFlightPlans,
  addFlightPlan: (newPlan) => {
    const timeStr = new Date().toISOString().substring(11, 19);
    const plan: FlightPlan = {
      ...newPlan,
      id: `fp-${Date.now()}`,
      time: timeStr
    };
    set((state) => ({ flightPlans: [plan, ...state.flightPlans] }));
  },
  updateFlightPlanStatus: (id, status) => set((state) => ({
    flightPlans: state.flightPlans.map((fp) => fp.id === id ? { ...fp, status } : fp)
  })),

  reports: initialReports,
  addReport: (newRep) => {
    const dateStr = new Date().toUTCString().replace(' GMT', ' UTC');
    const report: PendingReport = {
      ...newRep,
      id: `rep-${Date.now()}`,
      timestamp: dateStr,
      status: 'PENDING'
    };
    set((state) => ({ reports: [report, ...state.reports] }));
  },
  resolveReport: (id) => set((state) => ({
    reports: state.reports.map((r) => r.id === id ? { ...r, status: 'RESOLVED' } : r)
  })),

  // Modals
  isChangeFreqModalOpen: false,
  setChangeFreqModalOpen: (open) => set({ isChangeFreqModalOpen: open }),
  isNewEventModalOpen: false,
  setNewEventModalOpen: (open) => set({ isNewEventModalOpen: open }),
  isNewReportModalOpen: false,
  setNewReportModalOpen: (open) => set({ isNewReportModalOpen: open }),
  isNewFlightPlanModalOpen: false,
  setNewFlightPlanModalOpen: (open) => set({ isNewFlightPlanModalOpen: open }),
  selectedEquipmentId: null,
  setSelectedEquipmentId: (id) => set({ selectedEquipmentId: id }),

  triggerEmergencyAlert: (callSign, station, details) => {
    const timeStr = new Date().toISOString().substring(11, 19);
    const emgEvent: AirTrafficEvent = {
      id: `evt-emg-${Date.now()}`,
      time: timeStr,
      station: station as any || 'TWR',
      callSign,
      originDest: 'EMERGENCY LANDING',
      eventType: 'EMERGENCY',
      details
    };
    const emgReport: PendingReport = {
      id: `rep-emg-${Date.now()}`,
      title: `MAYDAY / EMERGENCY: ${callSign}`,
      timestamp: new Date().toUTCString(),
      priority: 'HIGH',
      category: 'Emergency Dispatch',
      details: `Declared emergency on frequency for ${callSign}. Details: ${details}`,
      status: 'PENDING',
      filedBy: 'AUTOMATED COMMS MONITOR'
    };
    set((state) => ({
      events: [emgEvent, ...state.events],
      reports: [emgReport, ...state.reports]
    }));
  }
}));
