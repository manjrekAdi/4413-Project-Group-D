-- Remove duplicate EVs, keeping only one per (model, brand)
DELETE FROM electric_vehicles
WHERE id NOT IN (
  SELECT min(id)
  FROM electric_vehicles
  GROUP BY model, brand
);

-- Optional: Show remaining EVs
SELECT id, model, brand FROM electric_vehicles ORDER BY id; 