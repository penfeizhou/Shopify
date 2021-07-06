import {
  CountryCode,
  CurrencyCode,
  UnitPriceMeasurementMeasuredType,
  UnitPriceMeasurementMeasuredUnit,
  WeightUnit,
} from "./Constants";

export interface Node {
  id?: string;
}

export interface Edge<T> {
  cursor?: string;
  node?: T;
}

export interface PageInfo {
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface Connection<T> {
  edges?: Edge<T>;
  pageInfo?: PageInfo;
}

export interface Image extends Node {
  altText?: string;
  height?: number;
  originalSrc?: string;
  transformedSrc?: string;
  width?: number;
}
export interface Model3dSource {
  filesize?: number;
  format?: string;
  mimeType?: string;
  url?: string;
}

export interface VideoSource {
  format?: string;
  height?: number;
  mimeType?: string;
  url?: string;
  width?: number;
}

export interface Media {
  alt?: string;
  mediaContentType?: "EXTERNAL_VIDEO" | "IMAGE" | "MODEL_3D" | "VIDEO";
  previewImage?: Image;
}
export interface ExternalVideo extends Media, Node {
  embeddedUrl?: string;
  host?: "YOUTUBE" | "VIMEO";
}

export interface MediaImage extends Media, Node {
  image?: Image;
}

export interface Model3d extends Media, Node {
  sources?: Model3dSource[];
}

export interface Video extends Media, Node {
  sources?: VideoSource[];
}

export interface Metafield extends Node {
  createdAt?: string;
  description?: string;
  key?: string;
  namespace?: string;
  parentResource?: undefined;
  type?: string;
  updatedAt?: string;
  value?: string;
}

export interface HasMetafields {
  metafield?: Metafield;
  metafields?: Connection<Metafield>;
}

export interface ArticleAuthor {
  bio?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
}
export interface CommentAuthor {
  email?: string;
  name?: string;
}
export interface SEO {
  description?: string;
  title?: string;
}
export interface Comment extends Node {
  author?: CommentAuthor;
  content?: string;
  contentHtml?: string;
}
export interface Article extends Node, HasMetafields {
  authorV2?: ArticleAuthor;
  blog?: Blog;
  comments?: undefined;
  content?: string;
  contentHtml?: string;
  excerpt?: string;
  excerptHtml?: string;
  handle?: string;
  image?: Image;
  publishedAt?: string;
  seo?: SEO;
  tags?: string[];
  title?: string;
  url?: string;
}

export interface Blog extends Node, HasMetafields {
  articleByHandle?: Article;
  articles?: Connection<Article>;
  authors?: ArticleAuthor[];
  handle?: string;
  seo?: SEO;
  title?: string;
  url?: string;
}
export interface MailingAddress extends Node {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  countryCodeV2?: CountryCode;
  firstName?: string;
  formatted?: string[];
  formattedArea?: string;
  lastName?: string;
  latitude?: number;
  longitude?: number;
  name?: string;
  phone?: string;
  province?: string;
  provinceCode?: string;
  zip?: string;
}

export interface Collection extends Node, HasMetafields {
  description?: string;
  descriptionHtml?: string;
  handle?: string;
  image?: Image;
  products?: Connection<Product>;
  title?: string;
  updatedAt?: string;
}

export interface Checkout extends Node {}
export interface Order extends Node, HasMetafields {}
export interface Customer extends HasMetafields {
  acceptsMarketing?: boolean;
  addresses?: Connection<MailingAddress>;
  createdAt?: string;
  defaultAddress?: MailingAddress;
  displayName?: string;
  email?: string;
  firstName?: string;
  lastIncompleteCheckout?: Checkout;
  lastName?: string;
  orders?: Connection<Order>;
  phone?: string;
  tags?: string[];
  updatedAt?: string;
}

export interface Page extends Node, HasMetafields {
  body?: string;
  bodySummary?: string;
  createdAt?: string;
  handle?: string;
  seo: SEO;
  title?: string;
  updatedAt?: string;
  url?: string;
}

export interface MoneyV2 {
  amount?: number;
  currencyCode?: CurrencyCode;
}

export interface ProductVariantPricePair {
  compareAtPrice?: MoneyV2;
  price?: MoneyV2;
}

export interface SelectedOption {
  name?: string;
  value?: string;
}

export interface SellingPlanOption {
  name?: string;
  value?: string;
}

export interface SellingPlanAllocationPriceAdjustment {
  compareAtPrice?: MoneyV2;
  perDeliveryPrice?: MoneyV2;
  price?: MoneyV2;
  unitPrice?: MoneyV2;
}

export interface SellingPlanFixedAmountPriceAdjustment {
  adjustmentAmount?: MoneyV2;
}
export interface SellingPlanFixedPriceAdjustment {
  price?: MoneyV2;
}
export interface SellingPlanPercentagePriceAdjustment {
  adjustmentPercentage?: number;
}
export interface SellingPlanPriceAdjustment {
  adjustmentValue?:
    | SellingPlanFixedAmountPriceAdjustment
    | SellingPlanFixedPriceAdjustment
    | SellingPlanPercentagePriceAdjustment;
  orderCount?: number;
}

export interface SellingPlan {
  description?: string;
  id?: string;
  name?: string;
  options?: SellingPlanOption[];
  priceAdjustments?: SellingPlanPriceAdjustment[];
  recurringDeliveries?: boolean;
}

export interface SellingPlanAllocation {
  priceAdjustment?: SellingPlanAllocationPriceAdjustment[];
  sellingPlan?: SellingPlan;
}

export interface LocationAddress {
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  countryCode?: string;
  formatted?: string[];
  latitude?: string;
  longitude?: string;
  phone?: string;
  province?: string;
  provinceCode?: string;
  zip?: string;
}

export interface Location extends Node {
  address?: LocationAddress;
  name?: string;
}

export interface StoreAvailability {
  available?: boolean;
  location?: Location;
  pickUpTime?: string;
}

export interface UnitPriceMeasurement {
  measuredType?: UnitPriceMeasurementMeasuredType;
  quantityUnit?: UnitPriceMeasurementMeasuredUnit;
  quantityValue?: number;
  referenceUnit?: UnitPriceMeasurementMeasuredUnit;
  referenceValue?: number;
}

export interface ProductVaraint extends Node, HasMetafields {
  availableForSale?: boolean;
  compareAtPriceV2?: MoneyV2;
  currentlyNotInStock?: boolean;
  image?: Image;
  presentmentPrices?: Connection<ProductVariantPricePair>;
  presentmentUnitPrices?: Connection<MoneyV2>;
  priceV2?: MoneyV2;
  product?: Product;
  quantityAvailable?: number;
  requiresShipping?: boolean;
  selectedOptions?: SelectedOption[];
  sellingPlanAllocations?: Connection<SellingPlanAllocation>;
  sku?: string;
  storeAvailability?: Connection<StoreAvailability>;
  title?: string;
  unitPrice?: MoneyV2;
  unitPriceMeasurement?: UnitPriceMeasurement;
  weight?: number;
  weightUnit?: WeightUnit;
}

export interface Product extends Node, HasMetafields {
  availableForSale?: boolean;
  collections?: undefined;
  compareAtPriceRange?: undefined;
  createdAt?: string;
  description?: string;
  descriptionHtml?: string;
  handle?: string;
  images?: Connection<Image>;
  media?: Connection<Media & Node>;
  onlineStoreUrl?: string;
  options?: undefined;
  presentmentPriceRanges?: undefined;
  priceRange?: undefined;
  productType?: string;
  publishedAt?: string;
  requiresSellingPlan?: boolean;
  sellingPlanGroups?: undefined;
  seo?: undefined;
  tags?: string[];
  title?: string;
  totalInventory?: number;
  updatedAt?: string;
  variantBySelectedOptions?: undefined;
  variants?: undefined;
  vendor?: string;
}
