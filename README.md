# API Server to create Vidomist PDF with the info gotten from the request body

###needed directory in the root with fonts (download for simplicity from google fonts)

## Request body example
```json
{
  "isBigunets": false,
  "reason": "академічна заборгованість",
  "docId": "1265539",
  "headerInfo": {
    "degree": "Бакалавр",
    "faculty": "Факультет інформатики",
    "year": 2,
    "groupId": "4I",
    "subjectTitle": "Математична логіка та теорія обчислень",
    "semestr": "4д",
    "zalikBali": 2,
    "controlForm": "екзамен",
    "date": ["23", "червня", "2013"],
    "vykl": {
      "pib": "Артеменко Анатолій Борисович",
      "scienceDegree": "кандидат фізико-математичних наук",
      "zvanya": "доцент",
      "posada": null
    }
  },
  "students": [
    ["Сидоренко Дмитро Андрійович", "І 048/10 бп", 40, 26, 66, "Задовільно", "D", ""],
    ["Сидорченко Антон Ігорович", "І 114/10 бп", 30, 30,60, "Задовільно", "E", "" ]
  ],
  "amount": [2,0,0],
  "dekanPib": "Глибовець Андрій Миколайович"
}
```
