var mapper = require("object-mapper");
const _ = require("lodash");

const getAttributes = (attributes) => {
  return attributes?.reduce((acc, attribute) => {
    const { code, values } = attribute;
    if (OFFER_ATTRIBUTES_MAPPER[code]) {
      acc[code] = _.first(values);
    }
    return acc;
  }, {});
};

const catalogMapper = {
  "eventData.offer_id": "offer_id",
  "eventData.brand_info.brand_id": "brand_id",
  "eventData.brand_info.brand_name": "brand_name",
  "eventData.esin": "esin",
  "eventData.navigation_categories": [
    {
      key: "category_id",
      transform: (categories) => {
        return categories?.map((category) => category.category_id);
      },
    },
    {
      key: "category_id_display_name",
      transform: (categories) => {
        return categories?.map(
          (category) => `${category.category_id}_${category.category_name}`
        );
      },
    },
  ],
  "eventData.attributes": {
    key: "attributes",
    transform: getAttributes,
  },
  "eventData.service_category": "service_category",
  "eventData.ebo_color": [{ key: "ebo_color" }, { key: "color" }],
  "eventData.ebo_size": [{ key: "ebo_size" }, { key: "size" }],
  "eventData.ebo_title": "display_name",
  "eventData.media.images": [
    {
      key: "primary_image_url",
      transform: (images) => {
        const primaryImage = images.find(
          (image) => image?.is_primary_for_store
        );
        return primaryImage?.url || "";
      },
    },
    {
      key: "primary_image_alt",
      transform: (images, src) => {
        const primaryImage = images.find(
          (image) => image?.is_primary_for_store
        );
        return _.isEmpty(primaryImage?.alt_text)
          ? src?.eventData?.ebo_title
          : primaryImage?.alt_text;
      },
    },
  ],
};
const OFFER_ATTRIBUTES = [
  "applications_md",
  "area_of_application_md",
  "bulb_included_md",
  "allowed_channels",
  "cable_entry_md",
  "capacity_md",
  "applications_of",
  "connectivity_md",
  "area_of_application_mf",
  "area_of_application_of",
  "availability_zone",
  "diameter_md",
  "dimension_md",
  "extinguisher_medium_md",
  "finish_of_glass_md",
  "finish_of_metal_md",
  "flush_tank_included_md",
  "ignition_type_md",
  "inlet_size_md",
  "installation_type_md",
  "ladder_height_md",
  "brand_collection",
  "brand_color",
  "brand_Id",
  "brand_model_number",
  "layers_md",
  "length_md",
  "length_of_wire_md",
  "material_of_the_burner_md",
  "material_of_the_product_md",
  "no_of_burners_md",
  "no_of_outlets_md",
  "no_of_pins_md",
  "no_of_ways_md",
  "class",
  "number_of_blades_md",
  "color",
  "number_of_coaxial_wire_md",
  "number_of_switches_md",
  "odour_md",
  "phase_md",
  "pins_md",
  "poles_md",
  "pressure_md",
  "protection_class_md",
  "protection_md",
  "remote_controlled_md",
  "sdr_schedule_md",
  "shape_md",
  "sheen_md",
  "shower_head_shape_md",
  "smart_home_enabled_md",
  "department",
  "step_md",
  "style_md",
  "suggested_rooms_for_this_design_md",
  "suitable_for_md",
  "sweep_size_md",
  "switch_type_md",
  "tank_capacity_md",
  "termite_resistant_md",
  "trap_distance_md",
  "trap_included_md",
  "type_of_burner_md",
  "ean",
  "ebo_color",
  "type_of_trap_md",
  "washable_md",
  "esin",
  "finish_drop",
  "is_bom",
  "is_lot_controlled",
  "is_published",
  "material_drop",
  "meta_keyword",
  "mounting_type",
  "mrp",
  "operation_type",
  "power_source",
  "power_type",
  "price",
  "quantity_and_stock_status",
  "sale_uom",
  "service_category",
  "sku",
  "status",
  "subclass",
  "suitable_for",
  "thread",
  "types_of_tiles",
  "type_drop",
  "usage",
  "usage_drop",
  "usage_information_of",
  "usage_mf",
];

const OFFER_ATTRIBUTES_MAPPER = OFFER_ATTRIBUTES.reduce((acc, attribute) => {
  acc[attribute] = attribute;
  return acc;
}, {});

const mapCatalogEventToIngest = ({ eventData }) => {
  const { attributes, ...offer } = mapper({ eventData }, catalogMapper);
  return { ...offer, ...attributes };
};

const offerEvent = {
  esin: "EOYTO4F8ZS",
  offer_id: "1000163427",
  unique_group_id: "Power & Hand Tools_Drill Bits_bosch_2607019442",
  ebo_title: "Bosch 2607019442 HSS-R 10pcs Metal Drill Bit Set",
  ebo_color: "Dark Green",
  ebo_grading: "KVI-BOTH",
  short_name: "Bosch 2607019442 HSS-R 10pcs Metal Drill Bit Set",
  description:
    "Bosch drill bit It has a cylindrical shank system (shank equal to drill bit diameter) and is intended for use in drill stands and drill drivers. Size-1mm, 2mm, 3mm, 4mm, 5mm, 6mm, 7mm, 8mm, 9mm, 10mm </p>\n<p>Key Features:</p>\n<li>  Precision-ground bit made of HSS enables fast results\n<li>  No need to pre-punch or pilot drill up to 10 mm-diameter",
  department: "Power & Hand Tools",
  class: "Power Tools Accessories",
  sub_class: "Drill Bit",
  pack_of: "1",
  navigation_category_ids: [
    "3146",
    "6670",
    "6679",
    "6760",
    "6442",
    "7274",
    "7484",
  ],
  country_of_origin: "China",
  start_datetime: "",
  product_type: "REGULAR",
  category_id: "121116",
  product_origin: "",
  pod_eligible: true,
  is_returnable: true,
  return_window_in_days: 7,
  warranty_in_months: 0,
  warranty_description: "Not Appliacable",
  requires_shipping: true,
  allowed_channel: "OMNI",
  mrp: "753",
  service_category: "NATIONAL",
  store_fulfilment_mode: "CNC",
  is_bom: false,
  bom_info: null,
  express_enabled: false,
  per_unit_price_applicable: false,
  per_unit_price_divisor: 0,
  per_unit_price_unit: "",
  key_features: [""],
  brand_info: {
    brand_id: "671",
    brand_name: "Bosch",
    brand_title: "",
    brand_description:
      "Bosch Power Tools division was incepted in 1993. With a complete range of power tools for construction, woodworking and metalworking industry, the division meets and fulfils the needs of professionals\n \nBosch power tools are designed to save energy, yet deliver highest levels of performance. These tools are compact and light in weight, they also run on Bosch lithium ion technology, that cater to diverse industrial sectors like automotive, construction, manufacturing, and home-interiors. Thus, offering the solutions to industrial and engineering applications that include screw driving, drilling, cutting etc.",
    brand_color: "Green",
    brand_model: "2607019442",
    brand_grading: "A",
    brand_collection: " ",
  },
  scm_info: {
    is_lot_controlled: true,
    lot_control_parameters: ["MRP"],
    carrier_type: "C",
    package_dimensions: {
      length_in_cm: 15,
      width_in_cm: 10,
      height_in_cm: 2,
      weight_in_kg: 0,
      is_verified: false,
    },
    is_dangerous: false,
    is_fragile: false,
    case_config: "1",
    has_shelf_life: false,
  },
  purchase_uom: "PCS",
  storage_uom: "PCS",
  sale_uom: "PCS",
  moq: [],
  seo_info: {
    slug: "EOYTO4F8ZS",
    keyword:
      "drill bits, metal drill bits, concrete drill bits, wood drill bits, sds drill bit,  hSS drill bits",
    meta: {
      title: "Bosch 2607019442 HSS-R 10pcs Metal Drill Bit Set",
      description: "",
    },
    canonical_url:
      "https://commerce.ibo.com/catalog/product/view/id/15476/s/1000163427/?___store=admin",
  },
  replenishability: "A",
  replenishability_action: "RP",
  hsn_code: "82075000",
  label_info: {
    manufactured_by: " ",
    packed_by:
      "Bosch Ltd., Post Box No: 3000,Hosur Road, Adugodi, Bangalore - 560030, India, Customer care No - 18004258665",
    imported_by:
      "Bosch Ltd., Post Box No: 3000,Hosur Road, Adugodi, Bangalore - 560030, India, Customer care No - 18004258665",
    marketed_by:
      "Bosch Ltd., Post Box No: 3000,Hosur Road, Adugodi, Bangalore - 560030, India, Customer care No - 18004258665",
    customer_care_address: "Toll Free: 1800-425-8665, Email: bpt@in.bosch.com",
  },
  media: {
    images: [
      {
        media_id: "3a3cf0db-eca0-4419-972f-001bb1872e0c",
        media_entity: "PRODUCT",
        media_type: "IMAGE",
        media_extension: "jpeg",
        url: "https://services.ibo.com/media/v1/products/images/3a3cf0db-eca0-4419-972f-001bb1872e0c/bosch-2607019442-hssr-10pcs-metal-drill-bit-set-1.jpeg",
        thumbnail_url: null,
        alt_text: "",
        position: 1,
        title: "",
        target_url: null,
        is_primary_for_store: true,
        is_primary_for_scm: false,
        is_external: false,
      },
      {
        media_id: "343c7582-53eb-4cb5-823c-10cc115dc471",
        media_entity: "PRODUCT",
        media_type: "IMAGE",
        media_extension: "jpeg",
        url: "https://services.ibo.com/media/v1/products/images/343c7582-53eb-4cb5-823c-10cc115dc471/bosch-2607019442-hssr-10pcs-metal-drill-bit-set-2.jpeg",
        thumbnail_url: null,
        alt_text: "",
        position: 2,
        title: "",
        target_url: null,
        is_primary_for_store: false,
        is_primary_for_scm: false,
        is_external: false,
      },
    ],
    videos: [],
    documents: [],
  },
  attributes: [
    {
      group: "Power Tool Accessories",
      code: "usage_drop",
      position: 365,
      display_name: "Usage",
      is_displayable: true,
      values: ["Drilling Holes"],
    },
    {
      group: "Power Tool Accessories",
      code: "type_drop",
      position: 360,
      display_name: "Type",
      is_displayable: true,
      values: ["Metal Drill Bit Set"],
    },
    {
      group: "Power Tool Accessories",
      code: "blade_diameter",
      position: 105,
      display_name: "Blade Diameter",
      is_displayable: true,
      values: ["NA"],
    },
    {
      group: "Power Tool Accessories",
      code: "disc_diameter",
      position: 130,
      display_name: "Disc Diameter",
      is_displayable: true,
      values: ["NA"],
    },
    {
      group: "Power Tool Accessories",
      code: "bore_diameter",
      position: 110,
      display_name: "Bore Diameter",
      is_displayable: true,
      values: ["NA"],
    },
    {
      group: "Power Tool Accessories",
      code: "bits_size",
      position: 100,
      display_name: "Bits Size",
      is_displayable: true,
      values: ["NA"],
    },
    {
      group: "Power Tool Accessories",
      code: "package_contents",
      position: 371,
      display_name: "Package Contents",
      is_displayable: true,
      values: [
        "10 pc Drill Bit Set(10 HSS-R Metal Drill Bits, Diameter 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 mm)",
      ],
    },
    {
      group: "Power Tool Accessories",
      code: "grit",
      position: 150,
      display_name: "Grit",
      is_displayable: true,
      values: ["NA"],
    },
    {
      group: "Core",
      code: "ebo_size",
      position: 25,
      display_name: "Size",
      is_displayable: true,
      values: ["1mm to 10 mm"],
    },
    {
      group: "Search Engine Optimization",
      code: "meta_ebo_grading",
      position: 0,
      display_name: "Meta Ebo Grading",
      is_displayable: false,
      values: ["HS"],
    },
  ],
  non_catalog: false,
  is_active: true,
  is_published: true,
  is_assisted_unloading_applicable: false,
  end_datetime: "",
};

const res = mapCatalogEventToIngest({ eventData: offerEvent });
console.log(res);
