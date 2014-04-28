import pymongo
import pandas as pd
import numpy as np
from pymongo import Connection
connection = Connection()
db = connection.test
watchers = db.watchers
df = pd.DataFrame(list(watchers.find()))
df2 = df.ix[:10000,:5]
df2 = df2.pivot_table(rows='login',cols='repo')
df2 = df2.applymap(lambda x: 0 if np.nan else 1)
df2.to_csv('test.csv', sep='\t')
