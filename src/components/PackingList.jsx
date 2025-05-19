"use client";
import { useState, useEffect } from 'react';
import { 
  PlusCircle, Trash2, Save, ChevronDown, ChevronUp, Box, 
  Monitor, Shirt, BriefcaseMedical, Briefcase, Utensils, Waves, Plane,
  Baby, Book, Camera, Backpack, Umbrella, Sparkles,
  Scissors, Globe, Bath, Coffee, PawPrint, Bike, Music
} from 'lucide-react';

export default function PackingChecklist() {
  // Icon mapping function for categories
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "clothing": <Shirt size={18} />,
      "clothes": <Shirt size={18} />,
      "toiletries": <Bath size={18} />,
      "electronics": <Monitor size={18} />,
      "tech": <Monitor size={18} />,
      "gadgets": <Monitor size={18} />,
      "documents": <Book size={18} />,
      "travel": <Plane size={18} />,
      "food": <Utensils size={18} />,
      "baby": <Baby size={18} />,
      "kids": <Baby size={18} />,
      "medical": <BriefcaseMedical size={18} />,
      "health": <BriefcaseMedical size={18} />,
      "medicine": <BriefcaseMedical size={18} />,
      "beach": <Waves size={18} />,
      "camera": <Camera size={18} />,
      "photography": <Camera size={18} />,
      "accessories": <Backpack size={18} />,
      "bag": <Backpack size={18} />,
      "backpack": <Backpack size={18} />,
      "rain": <Umbrella size={18} />,
      "weather": <Umbrella size={18} />,
      "work": <Briefcase size={18} />,
      "beauty": <Sparkles size={18} />,
      "tools": <Scissors size={18} />,
      "international": <Globe size={18} />,
      "drinks": <Coffee size={18} />,
      "beverages": <Coffee size={18} />,
      "pets": <PawPrint size={18} />,
      "sports": <Bike size={18} />,
      "exercise": <Bike size={18} />,
      "entertainment": <Music size={18} />
    };

    // Check if the category name (or part of it) matches any key in the icon map
    const lowercaseName = categoryName.toLowerCase();
    const matchingKey = Object.keys(iconMap).find(key => lowercaseName.includes(key));
    
    // Return the icon name instead of the JSX element
    return matchingKey || "box";
  };

  // Get the actual icon component based on the stored icon name
  const renderCategoryIcon = (iconName) => {
    const iconComponents = {
      "shirt": <Shirt size={18} />,
      "bath": <Bath size={18} />,
      "monitor": <Monitor size={18} />,
      "book": <Book size={18} />,
      "plane": <Plane size={18} />,
      "utensils": <Utensils size={18} />,
      "baby": <Baby size={18} />,
      "briefcasemedical": <BriefcaseMedical size={18} />,
      "waves": <Waves size={18} />,
      "camera": <Camera size={18} />,
      "backpack": <Backpack size={18} />,
      "umbrella": <Umbrella size={18} />,
      "briefcase": <Briefcase size={18} />,
      "sparkles": <Sparkles size={18} />,
      "scissors": <Scissors size={18} />,
      "globe": <Globe size={18} />,
      "coffee": <Coffee size={18} />,
      "pawprint": <PawPrint size={18} />,
      "bike": <Bike size={18} />,
      "music": <Music size={18} />,
      "box": <Box size={18} />
    };
    
    return iconComponents[iconName.toLowerCase()] || <Box size={18} />;
  };

  // Default categories and items with icon names instead of components
  const defaultCategories = [
    {
      id: 1,
      name: "Clothing",
      iconName: "shirt",
      isOpen: true,
      items: [
        { id: 101, name: "T-shirts", isPacked: false },
        { id: 102, name: "Pants/Shorts", isPacked: false },
        { id: 103, name: "Underwear", isPacked: false },
        { id: 104, name: "Socks", isPacked: false },
      ]
    },
    {
      id: 2,
      name: "Toiletries",
      iconName: "bath",
      isOpen: true,
      items: [
        { id: 201, name: "Toothbrush", isPacked: false },
        { id: 202, name: "Toothpaste", isPacked: false },
        { id: 203, name: "Shampoo", isPacked: false },
      ]
    },
    {
      id: 3,
      name: "Electronics",
      iconName: "monitor",
      isOpen: true,
      items: [
        { id: 301, name: "Phone charger", isPacked: false },
        { id: 302, name: "Laptop", isPacked: false },
        { id: 303, name: "Headphones", isPacked: false },
      ]
    }
  ];

  // State management
  const [categories, setCategories] = useState(defaultCategories);
  
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [addingItemToCategoryId, setAddingItemToCategoryId] = useState(null);
  const [listName, setListName] = useState('VOYAGE OS');
  const [editingListName, setEditingListName] = useState(false);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    try {
        const savedListName = localStorage.getItem('packingListName');
        if (savedListName) {
        setListName(savedListName);
        }
    } catch (error) {
        console.error("Error loading list name:", error);
    }
    }, []);
    useEffect(() => {
    try {
        const savedCategories = localStorage.getItem('packingListCategories');
        if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
        }
    } catch (error) {
        console.error("Error loading categories:", error);
    }
    }, []);
  // Save to localStorage whenever categories or list name changes
  useEffect(() => {
    try {
      localStorage.setItem('packingListCategories', JSON.stringify(categories));
      localStorage.setItem('packingListName', listName);
      
      // Calculate progress
      const totalItems = categories.reduce((sum, category) => sum + category.items.length, 0);
      const packedItems = categories.reduce((sum, category) => 
        sum + category.items.filter(item => item.isPacked).length, 0);
      
      setProgress(totalItems > 0 ? Math.round((packedItems / totalItems) * 100) : 0);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [categories, listName]);

  // Add a new category
  const handleAddCategory = () => {
    if (newCategoryName.trim() === '') return;
    
    const iconName = getCategoryIcon(newCategoryName);
    
    const newCategory = {
      id: Date.now(),
      name: newCategoryName,
      iconName: iconName,
      isOpen: true,
      items: []
    };
    
    setCategories([...categories, newCategory]);
    setNewCategoryName('');
  };

  // Delete a category
  const handleDeleteCategory = (categoryId) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, isOpen: !category.isOpen } 
        : category
    ));
  };

  // Start adding an item to a category
  const startAddingItem = (categoryId) => {
    setAddingItemToCategoryId(categoryId);
    setNewItemName('');
  };

  // Add a new item to a category
  const handleAddItem = (categoryId) => {
    if (newItemName.trim() === '') return;
    
    const newItem = {
      id: Date.now(),
      name: newItemName,
      isPacked: false
    };
    
    setCategories(categories.map(category => 
      category.id === categoryId
        ? { ...category, items: [...category.items, newItem] }
        : category
    ));
    
    setNewItemName('');
    setAddingItemToCategoryId(null);
  };

  // Delete an item
  const handleDeleteItem = (categoryId, itemId) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? { ...category, items: category.items.filter(item => item.id !== itemId) }
        : category
    ));
  };

  // Toggle an item's packed status
  const toggleItemPacked = (categoryId, itemId) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? { 
            ...category, 
            items: category.items.map(item => 
              item.id === itemId 
                ? { ...item, isPacked: !item.isPacked } 
                : item
            ) 
          }
        : category
    ));
  };

  // Handle saving the list (in a real app, this could connect to a backend)
  const handleSaveList = () => {
    // Simulate loading with setTimeout
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) {
      saveBtn.disabled = true;
      saveBtn.innerText = 'Syncing...';
      
      setTimeout(() => {
        saveBtn.disabled = false;
        saveBtn.innerText = 'Sync';
        alert('List synced to cloud storage!');
      }, 1000);
    }
  };

  // Reset the list to default
  const handleResetList = () => {
    if (window.confirm('Are you sure you want to reset the list? This will delete all your progress.')) {
      setCategories(defaultCategories);
      setListName('VOYAGE OS');
    }
  };

  // Clear localStorage completely (for testing)
  const clearAllData = () => {
    if (window.confirm('Debug: Clear all localStorage data?')) {
      localStorage.removeItem('packingListCategories');
      localStorage.removeItem('packingListName');
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          {editingListName ? (
            <div className="flex gap-2">
              <input
                type="text"
                className="px-3 py-2 bg-gray-800 border border-indigo-500 rounded-md flex-grow text-white"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                autoFocus
                onBlur={() => setEditingListName(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingListName(false)}
              />
              <button 
                className="bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={() => setEditingListName(false)}
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-3xl font-bold cursor-pointer tracking-wide" onClick={() => setEditingListName(true)}>
                  {listName}
                  <span className="ml-2 text-xs opacity-70 uppercase tracking-widest bg-indigo-800 px-2 py-1 rounded-md">v2.5</span>
                </div>
              </div>
              <button 
                id="save-btn"
                className="flex items-center gap-1 bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700 transition-all duration-200"
                onClick={handleSaveList}
              >
                <Save size={16} />
                <span>Sync</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Progress bar */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-purple-300 mb-2">
            <span>Mission Status</span>
            <span className="font-mono">{progress}%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 pb-24 flex-grow">
        {/* Categories */}
        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.id} className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 overflow-hidden hover:border-indigo-800 transition-all duration-200">
              <div 
                className="p-4 flex justify-between items-center cursor-pointer bg-gray-800 hover:bg-gray-750"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-full bg-indigo-900 text-indigo-300 bg-opacity-60 backdrop-blur-sm">
                    {renderCategoryIcon(category.iconName)}
                  </span>
                  <h2 className="text-lg font-medium text-white">{category.name}</h2>
                </div>
                <div className="flex gap-3 items-center">
                  <span className="text-sm text-indigo-300 font-mono">
                    {category.items.filter(item => item.isPacked).length}/{category.items.length}
                  </span>
                  <div className="bg-gray-700 p-1 rounded-md text-indigo-300">
                    {category.isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>
              </div>
              
              {category.isOpen && (
                <div className="border-t border-gray-700 px-4 py-3">
                  {/* Items list */}
                  <ul className="divide-y divide-gray-700">
                    {category.items.map(item => (
                      <li key={item.id} className="py-3 flex items-center justify-between group">
                        <div className="flex items-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={item.isPacked}
                              onChange={() => toggleItemPacked(category.id, item.id)}
                              className="w-5 h-5 mr-3 accent-indigo-600 rounded border-gray-600 bg-gray-700"
                            />
                            {item.isPacked && (
                              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                              </div>
                            )}
                          </div>
                          <span className={item.isPacked ? "line-through text-gray-500 transition-all duration-300" : "text-gray-200 transition-all duration-300"}>
                            {item.name}
                          </span>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteItem(category.id, item.id);
                          }}
                          className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          <Trash2 size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  
                  {/* Add new item */}
                  {addingItemToCategoryId === category.id ? (
                    <div className="flex gap-2 mt-4">
                      <input
                        type="text"
                        placeholder="Enter item name"
                        className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md flex-grow text-white text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAddItem(category.id)}
                        autoFocus
                      />
                      <button 
                        className="bg-indigo-600 text-white px-3 py-2 rounded-md hover:bg-indigo-700 text-sm transition-colors duration-200"
                        onClick={() => handleAddItem(category.id)}
                      >
                        Add
                      </button>
                      <button 
                        className="border border-gray-600 px-3 py-2 rounded-md hover:bg-gray-700 text-sm transition-colors duration-200"
                        onClick={() => setAddingItemToCategoryId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 mt-4 text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        startAddingItem(category.id);
                      }}
                    >
                      <PlusCircle size={16} />
                      <span>Add item</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add new category */}
        <div className="mt-8 bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-5">
          <h3 className="text-lg font-medium mb-4 text-purple-300">Add New Category</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-indigo-900 text-indigo-300 bg-opacity-60 backdrop-blur-sm">
                {newCategoryName ? renderCategoryIcon(getCategoryIcon(newCategoryName)) : <Box size={18} />}
              </div>
              <p className="text-sm text-gray-400">Icon will be automatically assigned</p>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter category name"
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg flex-grow text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              />
              <button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Reset and Debug buttons */}
        <div className="mt-8 text-center">
          <button 
            className="text-red-400 hover:text-red-300 text-sm border border-red-900 px-4 py-2 rounded-md hover:bg-red-900 hover:bg-opacity-20 transition-all duration-200"
            onClick={handleResetList}
          >
            Reset System
          </button>
          <button 
            className="ml-4 text-yellow-400 hover:text-yellow-300 text-sm border border-yellow-900 px-4 py-2 rounded-md hover:bg-yellow-900 hover:bg-opacity-20 transition-all duration-200"
            onClick={clearAllData}
          >
            Debug: Clear Data
          </button>
        </div>
      </main>
    </div>
  );
}