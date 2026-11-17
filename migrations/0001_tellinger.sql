-- Anonymous tallies. No IP, no user agent, no cookie, no identifier.

CREATE TABLE site_hits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tid TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  sti TEXT NOT NULL,
  kilde TEXT NOT NULL,
  enhet TEXT NOT NULL,
  annonseklikk INTEGER NOT NULL DEFAULT 0,
  test_run INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX site_hits_tid ON site_hits (tid);

CREATE TABLE booking_clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tid TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  kilde TEXT NOT NULL,
  enhet TEXT NOT NULL,
  test_run INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX booking_clicks_tid ON booking_clicks (tid);
