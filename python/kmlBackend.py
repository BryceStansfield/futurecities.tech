from fastkml import kml
#from geoClasses import point

doc = open("../datasets/doc.kml").read()
last = 0
pos = 0

while(pos>=0):
	pos = doc.find('<coordinates> ', last)+14
	if pos > last:
		second = doc[pos:doc.find(',', pos)]
		first = doc[pos+len(second)+1:doc.find(',', pos+len(second) + 1)]
		last = pos
		print(first,",",second)
	else:
		exit()
