import requests
import json
from bs4 import BeautifulSoup
from bson.json_util import dumps



def getMatches():
    req = requests.get('https://vrmasterleague.com/Onward/Matches.aspx')
    soup = BeautifulSoup(req.text)
    menu_standings = soup.find(id="MatchesRecent_MatchesNode")
    table = menu_standings.find(class_="matches_table")
    table = table.find('tbody')
    table = table.findAll('tr')
    matches = []
    for row in table:
        match = row.find_all('td')
        temp_match = {
            'date': '',
            'homeTeam': '',
            'awayTeam': '',
            'matchSet': ''
        }
        for index, td in enumerate(match):
            if(index == 0):
                temp_match['date'] = td.text
            elif (index == 2):
                temp_match['homeTeam'] = td.text
            elif (index == 3):
                temp_match['matchSet'] = td.find('a')['onclick'].split('"')[1]
            elif (index == 4):
                temp_match['awayTeam'] = td.text
        matches.append(temp_match)

    return getMatchStats(matches)


def getMatchStats(matches):
    string = ''
    req = requests.post('https://vrmasterleague.com/Services.asmx/GetMatchSets', {
        'encrValue': matches[0]['matchSet']
    })

    string = req.text
        # for map in maps:
        #    string = map
        #    match['map1'] = {
        #        'map': map['map'],
        #        'ScoreHome': map['ScoreHome'],
        #        'ScoreAway': map['ScoreAway']
        #    }

    return string
