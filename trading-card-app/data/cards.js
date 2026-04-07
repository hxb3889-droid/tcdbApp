import Papa from 'papaparse';

const csvData = `1,Roger Clemens RB,
2,Jim Deshaies RB,
3,Dwight Evans RB,
4,Dave Lopes RB,
5,Dave Righetti RB,*
6,Ruben Sierra RB,
7,Todd Worrell RB,
8,Terry Pendleton,
9,Jay Tibbs,
10,Cecil Cooper,
11,Indians Leaders TL,
12,Jeff Sellers RC,
13,Nick Esasky,
14,Dave Stewart,
15,Claudell Washington,
16,Pat Clements,
17,Pete O'Brien,
18,"Dick Howser MGR, CL",
19,Matt Young,
20,Gary Carter,
21,Mark Davis,
22,Doug DeCinces,
23,Lee Smith,
24,Tony Walker RC,
25,Bert Blyleven,
26,Greg Brock,
27,Joe Cowley,
28,Rick Dempsey,
29,Jimmy Key,
30,Tim Raines,
31,Braves Leaders TL,
32,Tim Leary,
33,Andy Van Slyke,
34,Jose Rijo,
35,Sid Bream,
36,Eric King RC,
37,Marvell Wynne,
38,Dennis Leonard,
39,Marty Barrett,
40,Dave Righetti,
41,Bo Diaz,
42,Gary Redus,
43,"Gene Michael MGR, CL",
44,Greg Harris,
45,Jim Presley,
46,Danny Gladden,
47,Dennis Powell,
48,Wally Backman,
49,Terry Harper,
50,Dave Smith,
51,Mel Hall,
52,Keith Atherton,
53,Ruppert Jones,
54,Bill Dawley,
55,Tim Wallach,
56,Brewers Leaders TL,
57,Scott Nielsen RC,
58,Thad Bosley,
59,Ken Dayley,
60,Tony Pena,
61,Bobby Thigpen RC,
62,Bobby Meacham,
63,Fred Toliver,
64,Harry Spilman,
65,Tom Browning,
66,Marc Sullivan,
67,Bill Swift,
68,"Tony LaRussa MGR, CL",
69,Lonnie Smith,
70,Charlie Hough,
71,Mike Aldrete RC,
72,Walt Terrell,
73,Dave Anderson,
74,Dan Pasqua,
75,Ron Darling,
76,Rafael Ramirez,
77,Bryan Oelkers,
78,Tom Foley,
79,Juan Nieves,
80,"Wally Joyner ASR, RC",
81,Padres Leaders TL,
82,Rob Murphy RC,
83,Mike Davis,
84,Steve Lake,
85,Kevin Bass,
86,Nate Snell,
87,Mark Salas,
88,Ed Wojna,
89,Ozzie Guillen,
90,Dave Stieb,
91,Harold Reynolds,
92,Urbano Lugo,
93,"Jim Leyland MGR, CL, RC",
94,Calvin Schiraldi,
95,Oddibe McDowell,
96,Frank Williams,
97,Glenn Wilson,
98,Bill Scherrer,
99,Darryl Motley,
100,Steve Garvey,
101,Carl Willis RC,
102,Paul Zuvella,
103,Rick Aguilera,
104,Billy Sample,
105,Floyd Youmans,
106,Blue Jays Leaders TL,
107,John Butcher,
108,Jim Gantner UER,
109,R.J. Reynolds,
110,John Tudor,
111,Alfredo Griffin,
112,Alan Ashby,
113,Neil Allen,
114,Billy Beane,
115,Donnie Moore,
116,Bill Russell,
117,Jim Beattie,
118,"Bobby Valentine MGR, CL",
119,Ron Robinson,
120,Eddie Murray,
121,Kevin Romine RC,
122,Jim Clancy,
123,John Kruk RC,
124,Ray Fontenot,
125,Bob Brenly,
126,Mike Loynd RC,
127,Vance Law,
128,Checklist: 1-132 CL,
129,Rick Cerone,
130,Dwight Gooden,
131,Pirates Leaders TL,
132,Paul Assenmacher RC,
133,Jose Oquendo,
134,Rich Yett RC,
135,Mike Easler,
136,Ron Romanick,
137,Jerry Willard,
138,Roy Lee Jackson,
139,Devon White RC,
140,Bret Saberhagen,
141,Herm Winningham,
142,Rick Sutcliffe,
143,"Steve Boros MGR, CL",
144,Mike Scioscia,
145,Charlie Kerfeld,
146,Tracy Jones RC,
147,Randy Niemann,
148,Dave Collins,
149,Ray Searage,
150,Wade Boggs,
151,Mike LaCoss,
152,Toby Harrah,
153,Duane Ward RC,
154,Tom O'Malley,
155,Eddie Whitson,*
156,Mariners Leaders TL,
157,Danny Darwin,
158,Tim Teufel,
159,Ed Olwine RC,
160,Julio Franco,
161,Steve Ontiveros,
162,Mike LaValliere RC,
163,Kevin Gross,
164,Sammy Khalifa,
165,Jeff Reardon,
166,Bob Boone,
167,Jim Deshaies RC,
168,"Lou Piniella MGR, CL",*
169,Ron Washington,
170,"Bo Jackson FS, RC",
171,Chuck Cary RC,*
172,Ron Oester,
173,Alex Trevino,
174,Henry Cotto,
175,Bob Stanley,
176,Steve Buechele,
177,Keith Moreland,
178,Cecil Fielder,
179,Bill Wegman,
180,Chris Brown,
181,Cardinals Leaders TL,
182,Lee Lacy,*
183,Andy Hawkins,
184,Bobby Bonilla RC,*
185,Roger McDowell,
186,Bruce Benedict,*
187,Mark Huismann,*
188,Tony Phillips,
189,Joe Hesketh,
190,Jim Sundberg,
191,Charles Hudson,
192,Cory Snyder ASR,
193,"Roger Craig MGR, CL",
194,Kirk McCaskill,
195,Mike Pagliarulo,*
196,Randy O'Neal,
197,Mark Bailey,*
198,Lee Mazzilli,
199,Mariano Duncan,*
200,Pete Rose,
201,John Cangelosi RC,*
202,Ricky Wright,
203,Mike Kingery RC,
204,Sammy Stewart,
205,Graig Nettles,
206,Twins Leaders TL,
207,George Frazier,
208,John Shelby,
209,Rick Schu,*
210,Lloyd Moseby,*
211,John Morris,
212,Mike Fitzgerald,
213,Randy Myers RC,
214,Omar Moreno,
215,Mark Langston,
216,"B.J. Surhoff FS, RC",
217,Chris Codiroli,
218,"Sparky Anderson MGR, CL",*
219,Cecilio Guante,
220,Joe Carter,
221,Vern Ruhle,*
222,Denny Walling,
223,Charlie Leibrandt,
224,Wayne Tolleson,
225,Mike Smithson,
226,Max Venable,
227,Jamie Moyer RC,
228,Curt Wilkerson,
229,Mike Birkbeck RC,
230,Don Baylor,
231,Giants Leaders TL,
232,Reggie Williams RC,
233,Russ Morman RC,*
234,Pat Sheridan,*
235,Alvin Davis,
236,Tommy John,
237,Jim Morrison,
238,Bill Krueger,
239,Juan Espino,*
240,Steve Balboni,
241,Danny Heep,*
242,Rick Mahler,
243,"Whitey Herzog MGR, CL",
244,Dickie Noles,
245,Willie Upshaw,
246,Jim Dwyer,
247,Jeff Reed,
248,Gene Walter,
249,Jim Pankovits,
250,Teddy Higuera,*
251,Rob Wilfong,
252,Denny Martinez,*
253,Eddie Milner,
254,Bob Tewksbury RC,*
255,Juan Samuel,
256,Royals Leaders TL,
257,Bob Forsch,*
258,Steve Yeager,
259,Mike Greenwell RC,
260,Vida Blue,
261,Ruben Sierra RC,
262,Jim Winn,*
263,Stan Javier,
264,Checklist: 133-264 CL,
265,Darrell Evans,
266,Jeff Hamilton RC,
267,Howard Johnson,
268,"Pat Corrales MGR, CL",*
269,Cliff Speck RC,
270,Jody Davis,*
271,Mike Brown,
272,Andres Galarraga,*
273,Gene Nelson,
274,Jeff Hearron RC,
275,LaMarr Hoyt,
276,Jackie Gutierrez,
277,Juan Agosto,
278,Gary Pettis,
279,Dan Plesac RC,
280,Jeffrey Leonard,
281,Reds Leaders TL,
282,Jeff Calhoun,
283,Doug Drabek RC,
284,John Moses,
285,Dennis Boyd,
286,Mike Woodard,
287,Dave Von Ohlen,*
288,Tito Landrum,
289,Bob Kipper,
290,Leon Durham,
291,Mitch Williams RC,*
292,Franklin Stubbs,
293,"Bob Rodgers MGR, CL",
294,Steve Jeltz,
295,Len Dykstra,
296,"Andres Thomas ASR, RC",
297,Don Schulze,
298,Larry Herndon,*
299,Joel Davis,*
300,Reggie Jackson,
301,Luis Aquino RC,
302,Bill Schroeder,
303,Juan Berenguer,
304,Phil Garner,
305,John Franco,*
306,Red Sox Leaders TL,
307,Lee Guetterman RC,*
308,Don Slaught,*
309,Mike Young,
310,Frank Viola,
311,Rickey Henderson TBC,
312,Reggie Jackson TBC,
313,Roberto Clemente TBC,*
314,Carl Yastrzemski TBC,
315,Maury Wills TBC,
316,Brian Fisher,
317,Clint Hurdle,
318,"Jim Fregosi MGR, CL",*
319,Greg Swindell RC,
320,Barry Bonds RC,*
321,Mike Laga,*
322,Chris Bando,*
323,Al Newman RC,
324,Dave Palmer,
325,Garry Templeton,
326,Mark Gubicza,
327,Dale Sveum RC,
328,Bob Welch,*
329,Ron Roenicke,*
330,Mike Scott,
331,Mets Leaders TL,
332,Joe Price,
333,Ken Phelps,
334,Ed Correa RC,
335,Candy Maldonado,
336,Allan Anderson RC,
337,Darrell Miller,
338,Tim Conroy,
339,Donnie Hill,
340,Roger Clemens,
341,Mike Brown,
342,Bob James,
343,"Hal Lanier MGR, CL",
344,Joe Niekro,
345,Andre Dawson,
346,Shawon Dunston,
347,Mickey Brantley,*
348,Carmelo Martinez,*
349,Storm Davis,*
350,Keith Hernandez,*
351,Gene Garber,*
352,Mike Felder,*
353,Ernie Camacho,
354,Jamie Quirk,
355,Don Carman,
356,White Sox Leaders TL,
357,Steve Fireovid RC,
358,Sal Butera,*
359,Doug Corbett,
360,Pedro Guerrero,
361,Mark Thurmond,
362,Luis Quinones RC,
363,Jose Guzman,*
364,Randy Bush,*
365,Rick Rhoden,
366,Mark McGwire,
367,Jeff Lahti,
368,"John McNamara MGR, CL",
369,Brian Dayett,*
370,Fred Lynn,
371,Mark Eichhorn RC,
372,Jerry Mumphrey,*
373,Jeff Dedmon,
374,Glenn Hoffman,
375,Ron Guidry,
376,Scott Bradley,*
377,John Henry Johnson,*
378,Rafael Santana,
379,John Russell,
380,Rich Gossage,
381,Expos Leaders TL,
382,Rudy Law,*
383,Ron Davis,
384,Johnny Grubb,
385,Orel Hershiser,
386,Dickie Thon,
387,T.R. Bryden,
388,Geno Petralli,
389,Jeff Robinson,
390,Gary Matthews,
391,Jay Howell,
392,Checklist: 265-396 CL,
393,"Pete Rose MGR, CL",
394,Mike Bielecki,*
395,Damaso Garcia,*
396,Tim Lollar,*
397,Greg Walker,
398,Brad Havens,
399,Curt Ford,*
400,George Brett,
401,Billy Jo Robidoux,
402,Mike Trujillo,*
403,Jerry Royster,
404,Doug Sisk,
405,Brook Jacoby,*
406,Yankees Leaders TL,
407,Jim Acker,
408,John Mizerock,
409,Milt Thompson,
410,Fernando Valenzuela,
411,Darnell Coles,*
412,Eric Davis,*
413,Moose Haas,
414,Joe Orsulak,
415,Bobby Witt RC,*
416,Tom Nieto,
417,Pat Perry,
418,"Dick Williams MGR, CL",
419,Mark Portugal RC,
420,Will Clark RC,*
421,Jose DeLeon,
422,Jack Howell,
423,Jaime Cocanower,*
424,Chris Speier,
425,Tom Seaver,
426,Floyd Rayford,
427,Ed Nunez,
428,Bruce Bochy,
429,"Tim Pyznarski FS, RC",
430,Mike Schmidt,
431,Dodgers Leaders TL,
432,Jim Slaton,
433,Ed Hearn RC,*
434,Mike Fischlin,*
435,Bruce Sutter,*
436,"Andy Allanson ASR, RC",
437,Ted Power,
438,Kelly Downs RC,*
439,Karl Best,
440,Willie McGee,*
441,Dave Leiper RC,*
442,Mitch Webster,*
443,"John Felske MGR, CL",
444,Jeff Russell,*
445,Dave Lopes,
446,Chuck Finley RC,
447,Bill Almon,*
448,Chris Bosio RC,
449,"Pat Dodson FS, RC",
450,Kirby Puckett,
451,Joe Sambito,
452,Dave Henderson,
453,Scott Terry RC,*
454,Luis Salazar,
455,Mike Boddicker,*
456,A's Leaders TL,
457,Len Matuszek,
458,Kelly Gruber,*
459,Dennis Eckersley,
460,Darryl Strawberry,
461,Craig McMurtry,*
462,Scott Fletcher,
463,Tom Candiotti,*
464,Butch Wynegar,
465,Todd Worrell ASR,
466,Kal Daniels,*
467,Randy St. Claire,
468,"George Bamberger MGR, CL",
469,Mike Diaz RC,
470,Dave Dravecky,*
471,Ronn Reynolds,
472,Bill Doran,
473,Steve Farr,
474,Jerry Narron,
475,Scott Garrelts,
476,Danny Tartabull ASR,*
477,Ken Howell,*
478,Tim Laudner,
479,Bob Sebra RC,
480,Jim Rice,*
481,Phillies Leaders TL,
482,Daryl Boston,
483,Dwight Lowry RC,
484,Jim Traber,
485,Tony Fernandez,
486,Otis Nixon,
487,Dave Gumpert,
488,Ray Knight,
489,Bill Gullickson,
490,Dale Murphy,
491,Ron Karkovice RC,*
492,Mike Heath,*
493,"Tom Lasorda MGR, CL",
494,Barry Jones RC,
495,Gorman Thomas,
496,Bruce Bochte,*
497,Dale Mohorcic RC,*
498,Bob Kearney,
499,"Bruce Ruffin ASR, RC",
500,Don Mattingly,
501,Craig Lefferts,
502,Dick Schofield,
503,Larry Andersen,
504,Mickey Hatcher,
505,Bryn Smith,
506,Orioles Leaders TL,
507,Dave Stapleton,
508,Scott Bankhead,*
509,Enos Cabell,
510,Tom Henke,
511,Steve Lyons,
512,"Dave Magadan FS, RC",*
513,Carmen Castillo,
514,Orlando Mercado,*
515,Willie Hernandez,
516,Ted Simmons,
517,Mario Soto,
518,"Gene Mauch MGR, CL",
519,Curt Young,*
520,Jack Clark,*
521,Rick Reuschel,
522,Checklist: 397-528 CL,
523,Earnie Riles,
524,Bob Shirley,*
525,Phil Bradley,*
526,Roger Mason,
527,Jim Wohlford,*
528,Ken Dixon,
529,Alvaro Espinoza RC,*
530,Tony Gwynn,*
531,Astros Leaders TL,*
532,Jeff Stone,
533,Argenis Salazar,
534,Scott Sanderson,
535,Tony Armas,
536,Terry Mulholland RC,
537,Rance Mulliniks,
538,Tom Niedenfuer,
539,Reid Nichols,
540,Terry Kennedy,
541,Rafael Belliard RC,
542,Ricky Horton,
543,"Dave Johnson MGR, CL",
544,Zane Smith,
545,Buddy Bell,
546,Mike Morgan,
547,Rob Deer,
548,Bill Mooneyham RC,*
549,Bob Melvin,*
550,"Pete Incaviglia ASR, RC",*
551,Frank Wills,
552,Larry Sheets,
553,Mike Maddux RC,*
554,Buddy Biancalana,
555,Dennis Rasmussen,*
556,Angels Leaders TL,
557,John Cerutti RC,*
558,Greg Gagne,
559,Lance McCullers,
560,Glenn Davis,
561,Rey Quinones RC,
562,Bryan Clutterbuck RC,
563,John Stefero,
564,Larry McWilliams,
565,Dusty Baker,
566,Tim Hulett,
567,Greg Mathews RC,
568,"Earl Weaver MGR, CL",*
569,Wade Rowdon,*
570,Sid Fernandez,*
571,Ozzie Virgil,*
572,Pete Ladd,
573,Hal McRae,*
574,Manny Lee,
575,Pat Tabler,
576,Frank Pastore,
577,Dann Bilardello,
578,Billy Hatcher,*
579,Rick Burleson,
580,Mike Krukow,
581,Cubs Leaders TL,
582,Bruce Berenyi,
583,Junior Ortiz,*
584,Ron Kittle,
585,Scott Bailes RC,*
586,Ben Oglivie,
587,Eric Plunk,*
588,Wallace Johnson,
589,Steve Crawford,
590,Vince Coleman,
591,Spike Owen,*
592,Chris Welsh,
593,"Chuck Tanner MGR, CL",
594,Rick Anderson RC,
595,"Keith Hernandez AS, LL",
596,"Steve Sax AS, LL",
597,"Mike Schmidt AS, LL",
598,"Ozzie Smith AS, LL",
599,"Tony Gwynn AS, LL",
600,"Dave Parker AS, LL",
601,"Darryl Strawberry AS, LL",
602,"Gary Carter AS, LL",
603,"Dwight Gooden AS, LL",
604,"Fernando Valenzuela AS, LL",
605,"Todd Worrell AS, LL",
606,"Don Mattingly AS, LL",
607,"Tony Bernazard AS, LL",*
608,"Wade Boggs AS, LL",*
609,"Cal Ripken AS, LL",
610,"Jim Rice AS, LL",
611,"Kirby Puckett AS, LL",
612,"George Bell AS, LL",
613,"Lance Parrish AS, LL",*
614,"Roger Clemens AS, LL",
615,"Teddy Higuera AS, LL",
616,"Dave Righetti AS, LL",*
617,Al Nipper,
618,"Tom Kelly MGR, CL, RC",*
619,Jerry Reed,*
620,Jose Canseco ASR,*
621,Danny Cox,
622,Glenn Braggs RC,*
623,Kurt Stillwell RC,
624,Tim Burke,*
625,Mookie Wilson,
626,Joel Skinner,
627,Ken Oberkfell,
628,Bob Walk,
629,Larry Parrish,
630,John Candelaria,
631,Tigers Leaders TL,
632,Rob Woodward,
633,Jose Uribe,*
634,"Rafael Palmeiro FS, RC",
635,Ken Schrom,
636,Darren Daulton,
637,Bip Roberts RC,
638,Rich Bordi,*
639,Gerald Perry,
640,Mark Clear,
641,Domingo Ramos,
642,Al Pulido,*
643,Ron Shepherd RC,
644,John Denny,
645,Dwight Evans,
646,Mike Mason,
647,Tom Lawless,
648,Barry Larkin RC,*
649,Mickey Tettleton,
650,Hubie Brooks,
651,Benny Distefano,
652,Terry Forster,
653,Kevin Mitchell RC,
654,Checklist: 529-660 CL,
655,Jesse Barfield,
656,Rangers Leaders TL,
657,Tom Waddell,
658,"Robby Thompson ASR, RC",
659,Aurelio Lopez,
660,Bob Horner,*
661,Lou Whitaker,*
662,Frank DiPino,*
663,Cliff Johnson,*
664,Mike Marshall,*
665,Rod Scurry,
666,Von Hayes,
667,Ron Hassey,
668,Juan Bonilla,*
669,Bud Black,*
670,Jose Cruz,*
671,Ray Soff RC,*
672,Chili Davis,*
673,Don Sutton,
674,Bill Campbell,
675,Ed Romero,
676,Charlie Moore,*
677,Bob Grich,*
678,Carney Lansford,*
679,Kent Hrbek,*
680,Ryne Sandberg,*
681,George Bell,
682,Jerry Reuss,*
683,Gary Roenicke,
684,Kent Tekulve,
685,Jerry Hairston,
686,Doyle Alexander,
687,Alan Trammell,
688,Juan Beniquez,*
689,Darrell Porter,*
690,Dane Iorg,*
691,Dave Parker,*
692,Frank White,
693,Terry Puhl,*
694,Phil Niekro,*
695,Chico Walker RC,
696,Gary Lucas,*
697,Ed Lynch,
698,Ernie Whitt,
699,Ken Landreaux,
700,Dave Bergman,
701,Willie Randolph,*
702,Greg Gross,*
703,Dave Schmidt,*
704,Jesse Orosco,*
705,Bruce Hurst,*
706,Rick Manning,*
707,Bob McClure,
708,Scott McGregor,*
709,Dave Kingman,*
710,Gary Gaetti,
711,Ken Griffey,
712,Don Robinson,
713,Tom Brookens,*
714,Dan Quisenberry,*
715,Bob Dernier,
716,Rick Leach,*
717,Ed Vande Berg,
718,Steve Carlton,*
719,Tom Hume,*
720,Richard Dotson,*
721,Tom Herr,
722,Bob Knepper,
723,Brett Butler,*
724,Greg Minton,
725,George Hendrick,
726,Frank Tanana,
727,Mike Moore,*
728,Tippy Martinez,
729,Tom Paciorek,*
730,Eric Show,*
731,Dave Concepcion,
732,Manny Trillo,
733,Bill Caudill,
734,Bill Madlock,
735,Rickey Henderson,
736,Steve Bedrosian,
737,Floyd Bannister,
738,Jorge Orta,*
739,Chet Lemon,*
740,Rich Gedman,*
741,Paul Molitor,
742,Andy McGaffigan,
743,Dwayne Murphy,
744,Roy Smalley,
745,Glenn Hubbard,
746,Bob Ojeda,
747,Johnny Ray,
748,Mike Flanagan,*
749,Ozzie Smith,*
750,Steve Trout,
751,Garth Iorg,*
752,Dan Petry,
753,Rick Honeycutt,
754,Dave LaPoint,
755,Luis Aguayo,*
756,Carlton Fisk,
757,Nolan Ryan,*
758,Tony Bernazard,
759,Joel Youngblood,*
760,Mike Witt,
761,Greg Pryor,
762,Gary Ward,*
763,Tim Flannery,
764,Bill Buckner,*
765,Kirk Gibson,*
766,Don Aase,
767,Ron Cey,
768,Dennis Lamp,
769,Steve Sax,
770,Dave Winfield,
771,Shane Rawley,*
772,Harold Baines,
773,Robin Yount,
774,Wayne Krenchicki,
775,Joaquin Andujar,
776,Tom Brunansky,
777,Chris Chambliss,
778,Jack Morris,*
779,Craig Reynolds,
780,Andre Thornton,*
781,Atlee Hammaker,
782,Brian Downing,*
783,Willie Wilson,
784,Cal Ripken,
785,Terry Francona,
786,"Jimy Williams MGR, CL",
787,Alejandro Pena,*
788,Tim Stoddard,*
789,Dan Schatzeder,*
790,Julio Cruz,*
791,Lance Parrish,
792,Checklist: 661-792 CL,`;

// Helper function to determine card type icon based on name
const getCardTypeIcon = (name, type) => {
  const nameLower = name.toLowerCase();
  
  // Check for basketball keywords
  if (nameLower.includes('basketball') || nameLower.includes('nba') || nameLower.includes('hoops')) {
    return 'basketball';
  }
  
  // Check for football keywords
  if (nameLower.includes('football') || nameLower.includes('nfl') || nameLower.includes('gridiron')) {
    return 'football';
  }
  
  // Check for hockey keywords
  if (nameLower.includes('hockey') || nameLower.includes('nhl') || nameLower.includes('ice')) {
    return 'ice-hockey';
  }
  
  // Check for soccer/football keywords
  if (nameLower.includes('soccer') || nameLower.includes('mls')) {
    return 'soccer';
  }
  
  // Default to baseball
  return 'baseball';
};

// Parse CSV data synchronously
const results = Papa.parse(csvData, {
  header: false,
  skipEmptyLines: true,
});

const cardsData = results.data.map((row) => {
  const [number, rawName, ownershipMarker] = row;
  const owned = !ownershipMarker || ownershipMarker.trim() === '';
  const name = rawName.trim();
  const type = 'Baseball';
  
  return {
    id: number,
    number: parseInt(number),
    name,
    team: '1987 Topps',
    type,
    owned,
    icon: getCardTypeIcon(name, type),
  };
});

export default cardsData;
