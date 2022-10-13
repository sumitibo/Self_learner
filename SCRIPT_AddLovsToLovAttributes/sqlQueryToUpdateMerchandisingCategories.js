const data = require("./data.json");
const { v5: uuidV5 } = require("uuid");

data.forEach((item) => {
  const lov_reference_id = uuidV5(
    `${item.category_id}_${item.group}_${item.attribute_code}`,
    uuidV5.URL
  );

  console.log(`UPDATE attribute_lov
    SET values_allowed = values_allowed || '["L", "XL"]'::jsonb
    WHERE lov_reference_id = '${lov_reference_id}';`);
});
