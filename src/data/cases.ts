/**
 * All 12 congenital heart disease cases
 *
 * Content philosophy:
 * - R1 forces schema activation (minimal cue)
 * - R2-R5 add just enough to resolve uncertainty
 * - Nearest distractor = what experts distinguish effortlessly
 * - Reveal = "aha!" moment in plain language
 */

import { Case } from '../types';

export const cases: Case[] = [
  // ACYANOTIC SHUNTS
  {
    id: 'asd',
    name: 'Atrial Septal Defect (secundum)',
    category: 'acyanotic-shunt',
    recognition:
      'Classically a fixed, wide split S2 with a midsystolic ejection flow murmur at the left upper sternal border (LUSB). Large shunts can create a soft mid-diastolic rumble at the lower sternal border from increased tricuspid inflow. CXR may show increased pulmonary vascular markings with right-sided enlargement.',
    hook: 'Embryology: Deficiency of the septum secundum.',
    nearestDistractor: {
      name: 'Innocent/physiologic split S2',
      whyNot:
        'Physiologic splitting varies with respiration; ASD splitting is fixed regardless of breathing phase.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Fixed split S2 in a child.',
      },
      {
        type: 'pathophys',
        content: 'Systolic flow murmur at LUSB; mild exercise intolerance.',
      },
      {
        type: 'image',
        content: 'Prominent pulmonary arteries with increased vascular markings.',
        media: {
          url: '/cases/asd/r3-crop.jpg',
          alt: 'CXR showing prominent pulmonary arteries',
          caption: 'Increased pulmonary blood flow → dilated pulmonary arteries',
        },
      },
      {
        type: 'audio',
        content: 'Persistently wide, fixed S2 with soft midsystolic flow.',
        media: {
          url: '/cases/asd/r4-audio.mp3',
          alt: 'Heart sound: fixed split S2',
        },
      },
      {
        type: 'confirmatory',
        content: 'Secundum defect confirmed (no AV-valve involvement).',
        media: {
          url: '/cases/asd/r5-full.jpg',
          alt: 'Full CXR with right-sided enlargement',
        },
      },
    ],
    reveal:
      'Constancy of the split is the giveaway. The flow murmur lives at the LUSB because the increased left-to-right shunt raises flow across the pulmonic valve. The story distinguishes it from physiologic splitting (variable) and from primum defects/AV canal (which implicate endocardial cushions and AV valves).',
  },

  {
    id: 'vsd',
    name: 'Ventricular Septal Defect',
    category: 'acyanotic-shunt',
    recognition:
      'A harsh holosystolic murmur maximal at the LLSB; small VSDs may sound louder and harsher than large ones. Significant shunts create left-sided volume overload and increased pulmonary vascular markings.',
    hook: 'Physiology: Loudness does not correlate with size—small restrictive VSDs can be very loud.',
    nearestDistractor: {
      name: 'Mitral regurgitation (MR)',
      whyNot:
        'MR is also holosystolic, but apical with radiation to the axilla, not parasternal.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Harsh holosystolic LLSB.',
      },
      {
        type: 'pathophys',
        content: 'Signs of LV volume load in larger shunts.',
      },
      {
        type: 'image',
        content: 'Pulmonary plethora with left-sided prominence.',
        media: {
          url: '/cases/vsd/r3-crop.jpg',
          alt: 'CXR with pulmonary overcirculation',
        },
      },
      {
        type: 'audio',
        content: 'Pansystolic, no diastolic tail; point of maximal intensity at LLSB.',
        media: {
          url: '/cases/vsd/r4-audio.mp3',
          alt: 'Holosystolic murmur at lower left sternal border',
        },
      },
      {
        type: 'confirmatory',
        content: 'No continuous component; location/radiation stays parasternal.',
      },
    ],
    reveal:
      'The holosystolic quality plus LLSB focus clinch VSD. When big, the hemodynamics point to LV volume overload and pulmonary overcirculation. MR is the trap—shift your stethoscope: apex and axilla radiation argue MR, not VSD.',
  },

  {
    id: 'pda',
    name: 'Patent Ductus Arteriosus',
    category: 'acyanotic-shunt',
    recognition:
      'A continuous "machinery" murmur at the left infraclavicular area that rises into/just after S2, often with bounding pulses and wide pulse pressure in larger PDAs.',
    hook: 'Exposure/association: Congenital rubella; also prematurity.',
    nearestDistractor: {
      name: 'Arteriovenous malformation (AVM)/venous hum',
      whyNot:
        'Continuous too, but site and S2-peaking envelope fit PDA best; AVM/venous hum lacks the crisp S2-adjacent crescendo.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Continuous murmur peaking near S2, left infraclavicular.',
      },
      {
        type: 'pathophys',
        content: 'Bounding pulses; wide pulse pressure.',
      },
      {
        type: 'image',
        content: 'Pulmonary plethora ± left atrial prominence.',
        media: {
          url: '/cases/pda/r3-crop.jpg',
          alt: 'CXR with increased pulmonary markings',
        },
      },
      {
        type: 'audio',
        content: 'Continuous, "machinery-like," intensity highest around S2.',
        media: {
          url: '/cases/pda/r4-audio.mp3',
          alt: 'Continuous machinery murmur',
        },
      },
      {
        type: 'confirmatory',
        content: 'Rubella/prematurity context or full CXR with overcirculation.',
      },
    ],
    reveal:
      'The continuous quality plus S2-adjacent peak and infraclavicular site are classic. Bounding pulses reflect diastolic runoff. Unlike holosystolic lesions, PDA spans both systole and diastole.',
  },

  // ACYANOTIC OBSTRUCTIVE
  {
    id: 'coa',
    name: 'Coarctation of the Aorta',
    category: 'acyanotic-obstructive',
    recognition:
      'Upper-extremity > lower-extremity blood pressure, diminished/delayed femoral pulses, and a posterior systolic murmur best between the scapulae. Long-standing disease shows rib notching (3rd–8th ribs) and a figure-3 sign on CXR.',
    hook: 'Physiology: Collaterals through intercostals produce the rib notching.',
    nearestDistractor: {
      name: 'Aortic stenosis (AS)',
      whyNot:
        'AS radiates to carotids anteriorly; CoA murmurs often project to the back and create an arm–leg BP gradient.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'UE > LE BP; weak femoral pulses.',
      },
      {
        type: 'pathophys',
        content: 'Systolic murmur heard interscapular/back.',
      },
      {
        type: 'image',
        content: 'Rib notching (3rd–8th ribs) from collaterals.',
        media: {
          url: '/cases/coa/r3-crop.jpg',
          alt: 'CXR crop showing rib notching',
        },
      },
      {
        type: 'audio',
        content: 'Systolic whoosh with posterior radiation.',
        media: {
          url: '/cases/coa/r4-audio.mp3',
          alt: 'Systolic murmur, posterior',
        },
      },
      {
        type: 'confirmatory',
        content: 'Full CXR with figure-3 contour (pre/post stenotic dilation).',
        media: {
          url: '/cases/coa/r5-full.jpg',
          alt: 'Figure-3 sign on aortic knob',
        },
      },
    ],
    reveal:
      'The combination of a posterior murmur and a measurable arm–leg gradient is the clinical tell. Rib notching/figure-3 on imaging seals it and distinguishes CoA from AS.',
  },

  {
    id: 'ps',
    name: 'Pulmonic Stenosis (severe)',
    category: 'acyanotic-obstructive',
    recognition:
      'Systolic ejection murmur at the LUSB with an ejection click; often a wide split S2 with a soft/delayed P2. Post-stenotic dilation of the main pulmonary artery can appear on CXR in valvar PS.',
    hook: 'Physical behavior: Right-sided outflow murmurs may intensify with inspiration (↑ right-sided flow).',
    nearestDistractor: {
      name: 'Tetralogy of Fallot (TOF)',
      whyNot:
        'TOF has single S2, cyanotic spells/squatting, and the classic boot silhouette.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'LUSB ejection murmur with click.',
      },
      {
        type: 'pathophys',
        content: 'Wide split S2; soft P2.',
      },
      {
        type: 'image',
        content: 'Prominent main PA segment (post-stenotic dilation).',
        media: {
          url: '/cases/ps/r3-crop.jpg',
          alt: 'Dilated main pulmonary artery',
        },
      },
      {
        type: 'audio',
        content: 'Crescendo–decrescendo midsystolic; audible ejection click.',
        media: {
          url: '/cases/ps/r4-audio.mp3',
          alt: 'Systolic ejection murmur with click',
        },
      },
      {
        type: 'confirmatory',
        content: 'No boot silhouette; no single S2.',
      },
    ],
    reveal:
      'An ejection click at the LUSB and a split S2 point to isolated PS. TOF is the common trap—but its single S2, cyanosis, and CXR profile separate it.',
  },

  // CYANOTIC CONOTRUNCAL
  {
    id: 'tof',
    name: 'Tetralogy of Fallot',
    category: 'cyanotic-conotruncal',
    recognition:
      'Single S2, harsh LUSB ejection murmur (RVOT), decreased pulmonary vascular markings, and the boot-shaped heart. Toddlers may squat to relieve tet spells (↑ SVR reduces right-to-left shunt).',
    hook: 'Embryology/genetics: Conotruncal anomaly; association with 22q11.2 deletion.',
    nearestDistractor: {
      name: 'Isolated PS',
      whyNot:
        'Isolated PS keeps a split S2 and lacks the boot/oligemia/squatting physiology.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Single S2; child squats after exertion.',
      },
      {
        type: 'pathophys',
        content: 'Harsh SEM at LUSB; oligemic lungs.',
      },
      {
        type: 'image',
        content: 'Boot-shaped heart with upturned apex.',
        media: {
          url: '/cases/tof/r3-crop.jpg',
          alt: 'Boot silhouette on CXR',
        },
      },
      {
        type: 'audio',
        content: 'Early-peaking ejection; single S2.',
        media: {
          url: '/cases/tof/r4-audio.mp3',
          alt: 'Systolic ejection murmur, single S2',
        },
      },
      {
        type: 'confirmatory',
        content: 'Full CXR; conotruncal association (22q11.2).',
      },
    ],
    reveal:
      'The single S2 and boot silhouette are the anchors. Squatting physiology and oligemic lungs reflect RVOT obstruction with right-to-left shunting—why TOF behaves differently from isolated PS.',
  },

  {
    id: 'tga',
    name: 'd-Transposition of the Great Arteries',
    category: 'cyanotic-conotruncal',
    recognition:
      'Profound neonatal cyanosis with clear lungs and minimal response to 100% O₂ (limited mixing). CXR often shows narrow mediastinum ("egg-on-a-string"). Heart sounds may be otherwise unremarkable.',
    hook: 'Association: Maternal diabetes is a recognized risk association for outflow anomalies, including TGA.',
    nearestDistractor: {
      name: 'TAPVR (supracardiac)',
      whyNot:
        'TAPVR classically shows a snowman/figure-8 with widened upper mediastinum and signs of pulmonary overcirculation when unobstructed.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Neonate: profound cyanosis, lungs clear.',
      },
      {
        type: 'pathophys',
        content: 'Hyperoxia test: minimal PaO₂ rise.',
      },
      {
        type: 'image',
        content: 'Narrow mediastinum ("egg-on-a-string").',
        media: {
          url: '/cases/tga/r3-crop.jpg',
          alt: 'Egg-on-a-string silhouette',
        },
      },
      {
        type: 'audio',
        content: 'Normal S1/S2; no pathognomonic murmur.',
      },
      {
        type: 'confirmatory',
        content: 'Full CXR; maternal diabetes risk association.',
      },
    ],
    reveal:
      'Parallel circulations explain the early cyanosis and the poor hyperoxia response. The slender great-vessel pedicle yields the "egg-on-a-string" look—different from the snowman of supracardiac TAPVR.',
  },

  {
    id: 'truncus',
    name: 'Truncus Arteriosus',
    category: 'cyanotic-conotruncal',
    recognition:
      'Single S2 (one semilunar valve), a systolic ejection murmur, early heart failure with pulmonary overcirculation, and often bounding pulses from diastolic runoff. A large VSD is inherent.',
    hook: 'Embryology/genetics: Conotruncal defect; association with 22q11.2 deletion.',
    nearestDistractor: {
      name: 'Large VSD',
      whyNot:
        'Large VSD lacks a single S2 and typically does not produce bounding pulses/early severe HF to the same degree without the common trunk physiology.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Single S2; poor feeding, tachypnea.',
      },
      {
        type: 'pathophys',
        content: 'Early HF with pulmonary plethora; systolic ejection quality.',
      },
      {
        type: 'image',
        content: 'Cardiomegaly with overcirculation.',
        media: {
          url: '/cases/truncus/r3-crop.jpg',
          alt: 'CXR showing cardiomegaly and plethora',
        },
      },
      {
        type: 'audio',
        content: 'Ejection across a single semilunar valve; no separate P2.',
        media: {
          url: '/cases/truncus/r4-audio.mp3',
          alt: 'Single S2 with ejection murmur',
        },
      },
      {
        type: 'confirmatory',
        content: 'Conotruncal/22q11 association.',
      },
    ],
    reveal:
      'The single outflow tract explains the single S2 and early overcirculation. It looks like "VSD-plus," but the physiology (one trunk) produces earlier HF and sometimes bounding pulses from diastolic runoff—why it isn\'t "just a big VSD."',
  },

  // CYANOTIC OTHER
  {
    id: 'tapvr',
    name: 'Total Anomalous Pulmonary Venous Return (supracardiac)',
    category: 'cyanotic-other',
    recognition:
      'Variable cyanosis; in the supracardiac, unobstructed form you see increased pulmonary blood flow, a fixed split S2 from right-sided volume load, and on CXR the classic snowman/figure-8 (dilated vertical vein + SVC). Obstruction produces respiratory distress and edema.',
    hook: 'Physiology: All pulmonary veins drain to systemic venous circulation → obligatory shunt across an ASD/PFO.',
    nearestDistractor: {
      name: 'd-TGA',
      whyNot:
        'd-TGA shows narrow mediastinum (egg-on-a-string) and often clear lungs without plethora; TAPVR\'s snowman widens the upper mediastinum.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Cyanosis with tachypnea; loud S2 splitting.',
      },
      {
        type: 'pathophys',
        content: 'Right-sided volume overload clues.',
      },
      {
        type: 'image',
        content: 'Snowman/figure-8 upper mediastinum.',
        media: {
          url: '/cases/tapvr/r3-crop.jpg',
          alt: 'Snowman silhouette on CXR',
        },
      },
      {
        type: 'audio',
        content: 'Fixed split S2; LUSB flow murmur.',
        media: {
          url: '/cases/tapvr/r4-audio.mp3',
          alt: 'Fixed split S2 with flow murmur',
        },
      },
      {
        type: 'confirmatory',
        content: 'Full CXR; obligatory interatrial shunt noted.',
      },
    ],
    reveal:
      'The anatomy reroutes pulmonary veins to the systemic venous side, forcing mixing across an atrial level. The snowman silhouette and fixed split S2 with flow murmur separate TAPVR from TGA.',
  },

  {
    id: 'avsd',
    name: 'Atrioventricular Septal Defect (complete AVSD)',
    category: 'cyanotic-other',
    recognition:
      'Failure of endocardial cushion formation creates a common AV valve with a primum ASD and inlet VSD. You hear AV-valve regurgitation (often holosystolic at the LLSB/apex), signs of volume overload, and pulmonary overcirculation on CXR.',
    hook: 'Genetics: Strong association with trisomy 21 (Down syndrome).',
    nearestDistractor: {
      name: 'Primum ASD alone',
      whyNot:
        'Primum ASD alone has no inlet VSD and less AV-valve regurgitation; the regurgitant murmur and heavier volume load push toward complete AVSD.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Infant with tachypnea, poor weight gain.',
      },
      {
        type: 'pathophys',
        content: 'Holosystolic AV-valve regurgitant murmur.',
      },
      {
        type: 'image',
        content: 'Cardiomegaly with pulmonary plethora.',
        media: {
          url: '/cases/avsd/r3-crop.jpg',
          alt: 'CXR with cardiomegaly and overcirculation',
        },
      },
      {
        type: 'audio',
        content: 'Combined systolic regurgitation rather than isolated flow.',
        media: {
          url: '/cases/avsd/r4-audio.mp3',
          alt: 'Holosystolic regurgitant murmur',
        },
      },
      {
        type: 'confirmatory',
        content: 'Endocardial cushion/Down syndrome context.',
      },
    ],
    reveal:
      'The key is both an atrial and ventricular septal component plus AV-valve regurgitation from a common valve. The trisomy 21 context is supportive but not required for recognition.',
  },

  {
    id: 'ebstein',
    name: 'Ebstein Anomaly',
    category: 'cyanotic-other',
    recognition:
      'Apical displacement of the tricuspid valve creates "atrialization" of the RV, a massive right atrium on imaging, and prominent tricuspid regurgitation: a holosystolic murmur at the LLSB that increases with inspiration (Carvallo). Cyanosis may occur via right-to-left flow at the atrial level.',
    hook: 'Exposure/association: Lithium exposure is a classic association.',
    nearestDistractor: {
      name: 'Functional TR from pulmonary hypertension',
      whyNot:
        'Functional TR usually lacks the striking RA enlargement and congenital valve displacement.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'LLSB holosystolic murmur louder with inspiration.',
      },
      {
        type: 'pathophys',
        content: 'Right-sided enlargement; possible cyanosis.',
      },
      {
        type: 'image',
        content: 'Very large right atrial contour ("boxy" silhouette).',
        media: {
          url: '/cases/ebstein/r3-crop.jpg',
          alt: 'Massive RA on CXR',
        },
      },
      {
        type: 'audio',
        content: 'TR quality that augments on inspiration.',
        media: {
          url: '/cases/ebstein/r4-audio.mp3',
          alt: 'Holosystolic murmur increasing with inspiration',
        },
      },
      {
        type: 'confirmatory',
        content: 'Congenital (displaced tricuspid) context; lithium association clue.',
      },
    ],
    reveal:
      'The site and inspiratory augmentation shout TR; the striking right-atrial enlargement and atrial-level shunt physiology point to Ebstein, not acquired TR.',
  },

  {
    id: 'hlhs',
    name: 'Hypoplastic Left Heart Syndrome',
    category: 'cyanotic-other',
    recognition:
      'Gray, shocky neonate as the ductus closes: poor perfusion, weak pulses, acidosis. Heart sounds may be unremarkable or show a single prominent S2 (pulmonic). CXR can show cardiomegaly and pulmonary edema.',
    hook: 'Stabilization concept: Prostaglandin E₁ to maintain ductal patency while definitive care is arranged.',
    nearestDistractor: {
      name: 'Severe sepsis',
      whyNot:
        'Sepsis may mimic shock, but pre/post-ductal saturation differences and critical dependence on ductal flow favor HLHS.',
    },
    rungs: [
      {
        type: 'whisper',
        content: 'Neonate in shock when duct closes.',
      },
      {
        type: 'pathophys',
        content: 'Weak pulses; differential sats possible.',
      },
      {
        type: 'image',
        content: 'Cardiomegaly ± pulmonary edema.',
        media: {
          url: '/cases/hlhs/r3-crop.jpg',
          alt: 'CXR with cardiomegaly and edema',
        },
      },
      {
        type: 'audio',
        content: 'Nonspecific; no pathognomonic murmur required.',
      },
      {
        type: 'confirmatory',
        content: 'Duct-dependent physiology; immediate PGE₁ concept.',
      },
    ],
    reveal:
      'The system collapses as systemic flow disappears with ductal closure. Think duct-dependent left-sided outflow obstruction: keep the duct open first; detailed surgical pathways are beyond Step 1 scope.',
  },
];

// Export helpers
export const getCaseById = (id: string): Case | undefined => cases.find((c) => c.id === id);

export const getCasesByCategory = (category: Case['category']): Case[] =>
  cases.filter((c) => c.category === category);

export const getRandomCase = (): Case => cases[Math.floor(Math.random() * cases.length)];

export const getCaseNames = (): string[] => cases.map((c) => c.name);
