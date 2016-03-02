module CategoriesHelper
  def set_partial(category, json)
    json.partial! 'category', category: category
  end

  def set_array(json)
    json.array! @categories do |category|
      set_partial(category, json)
    end
  end
end
