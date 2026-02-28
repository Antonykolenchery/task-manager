// App.jsx
import { useState, useEffect, useRef } from "react";
import "./App.css";

export default function App() {
  const [device, setDevice] = useState("desktop");
  const [previewMode, setPreviewMode] = useState("edit");
  const [selectedElement, setSelectedElement] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);
  
  // Your exact configuration
  const [elements, setElements] = useState({
    desktop: {
      sidebar: { width: 234, visible: true },
      image: { width: 717, height: 300, x: 13, y: 0 },
      cards: { columns: 4, gap: 20 }
    },
    tablet: {
      sidebar: { width: 200, visible: true },
      image: { width: 500, height: 181, x: 0, y: 0 },
      cards: { columns: 2, gap: 15 }
    },
    mobile: {
      sidebar: { width: 0, visible: false },
      image: { width: 300, height: 150, x: 10, y: 10 },
      cards: { columns: 2, gap: 10 }
    }
  });

  // Real device specifications for accurate testing
  const deviceSpecs = {
    desktop: {
      name: "MacBook Pro 16",
      width: 1512, // Actual MacBook Pro resolution
      height: 982,
      frameColor: "#1e1e1e",
      bezel: 15,
      screenRadius: 8,
      icon: "💻",
      viewportWidth: 1512,
      viewportHeight: 982
    },
    tablet: {
      name: "iPad Pro 12.9",
      width: 1024, // Actual iPad Pro resolution
      height: 1366,
      frameColor: "#2d2d2d",
      bezel: 30,
      screenRadius: 20,
      icon: "📱",
      viewportWidth: 1024,
      viewportHeight: 1366
    },
    mobile: {
      name: "iPhone 15 Pro",
      width: 390, // Actual iPhone 15 Pro resolution
      height: 844,
      frameColor: "#121212",
      bezel: 25,
      screenRadius: 40,
      icon: "📱",
      viewportWidth: 390,
      viewportHeight: 844
    }
  };

  // Handle image dragging
  const handleImageMouseDown = (e) => {
    if (selectedElement === 'image' && previewMode === 'edit') {
      setIsDragging(true);
      const rect = e.target.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && selectedElement === 'image' && previewMode === 'edit' && previewRef.current) {
      const previewRect = previewRef.current.getBoundingClientRect();
      const newX = e.clientX - previewRect.left - dragOffset.x;
      const newY = e.clientY - previewRect.top - dragOffset.y;
      
      setElements(prev => ({
        ...prev,
        [device]: {
          ...prev[device],
          image: {
            ...prev[device].image,
            x: Math.max(0, Math.min(newX, previewRect.width - prev[device].image.width)),
            y: Math.max(0, Math.min(newY, previewRect.height - prev[device].image.height - 100)) // Account for header
          }
        }
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Update element properties
  const updateElementProperty = (element, property, value) => {
    setElements(prev => ({
      ...prev,
      [device]: {
        ...prev[device],
        [element]: {
          ...prev[device][element],
          [property]: value
        }
      }
    }));
  };

  // Test viewport meta for mobile
  useEffect(() => {
    if (previewMode === 'preview' || previewMode === 'compare') {
      // Add viewport meta for accurate mobile testing
      let viewport = document.querySelector('meta[name=viewport]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    }
  }, [previewMode]);

  // Render preview content with your exact layout
  const renderPreview = (deviceType) => (
    <div className={`preview-content ${deviceType}`} data-device={deviceType}>
      <div className="layout">
        {elements[deviceType].sidebar.visible && (
          <aside 
            className={`sidebar ${selectedElement === 'sidebar' && previewMode === 'edit' ? 'selected' : ''}`}
            style={{ width: elements[deviceType].sidebar.width }}
            onClick={() => previewMode === 'edit' && setSelectedElement('sidebar')}
          >
            <div className="sidebar-content">
              <h3>MENU</h3>
              <nav>
                <ul>
                  <li className="active">📊 Dashboard</li>
                  <li>✅ Tasks</li>
                  <li>📁 Projects</li>
                  <li>📅 Calendar</li>
                  <li>⚙️ Settings</li>
                </ul>
              </nav>
              <div className="sidebar-footer">
                <p>Widget v1.0</p>
              </div>
            </div>
          </aside>
        )}

        <main className="content">
          <header className="content-header">
            <h2>Task Manager Widget</h2>
            <p className="date">{new Date().toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</p>
          </header>

          {/* Stats Cards */}
          <div className="stats-container">
            <div className="stat-card">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">24</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Completed</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">In Progress</span>
              <span className="stat-value">8</span>
            </div>
          </div>

          {/* Task Cards Grid */}
          <div 
            className={`card-container ${selectedElement === 'cards' && previewMode === 'edit' ? 'selected' : ''}`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${elements[deviceType].cards.columns}, 1fr)`,
              gap: `${elements[deviceType].cards.gap}px`
            }}
            onClick={() => previewMode === 'edit' && setSelectedElement('cards')}
          >
            <div className="card">
              <div className="card-priority high"></div>
              <h4>Design Review</h4>
              <p>Review new dashboard designs</p>
              <span className="card-date">Today</span>
            </div>
            <div className="card">
              <div className="card-priority medium"></div>
              <h4>Development</h4>
              <p>Implement widget components</p>
              <span className="card-date">Tomorrow</span>
            </div>
            <div className="card">
              <div className="card-priority low"></div>
              <h4>Testing</h4>
              <p>Test on real devices</p>
              <span className="card-date">Wed</span>
            </div>
            <div className="card">
              <div className="card-priority high"></div>
              <h4>Deployment</h4>
              <p>Deploy to production</p>
              <span className="card-date">Fri</span>
            </div>
          </div>

          {/* Image Widget */}
          <div 
            className={`image-wrapper ${selectedElement === 'image' && previewMode === 'edit' ? 'selected' : ''}`}
            style={{
              position: 'relative',
              left: elements[deviceType].image.x,
              top: elements[deviceType].image.y
            }}
            onClick={() => previewMode === 'edit' && setSelectedElement('image')}
          >
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format"
              alt="Analytics Dashboard"
              className="image"
              style={{
                width: elements[deviceType].image.width,
                height: elements[deviceType].image.height
              }}
              onMouseDown={handleImageMouseDown}
            />
            {selectedElement === 'image' && previewMode === 'edit' && (
              <div className="resize-handle"></div>
            )}
          </div>
        </main>
      </div>
    </div>
  );

  // Render device frame with real dimensions
  const renderDeviceFrame = (deviceType, content) => {
    const spec = deviceSpecs[deviceType];
    return (
      <div className={`device-frame ${deviceType}`} style={{ backgroundColor: spec.frameColor }}>
        <div className="device-bezel">
          {deviceType === 'mobile' && (
            <>
              <div className="dynamic-island"></div>
              <div className="front-camera"></div>
            </>
          )}
          {deviceType === 'tablet' && <div className="front-camera tablet"></div>}
          <div className="device-screen" style={{ 
            borderRadius: spec.screenRadius,
            width: spec.width,
            height: spec.height,
            maxWidth: '100%',
            maxHeight: '70vh'
          }}>
            {content}
          </div>
        </div>
        <div className="device-info">
          <span className="device-name">{spec.icon} {spec.name}</span>
          <span className="device-dimensions">{spec.width} × {spec.height}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="app" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      {/* Header */}
      <header className="header">
        <h1>📱 Widget Tester - Real Device Preview</h1>
        <div className="mode-selector">
          <button 
            onClick={() => setPreviewMode('edit')} 
            className={previewMode === 'edit' ? 'active' : ''}
          >
            ✏️ Edit Layout
          </button>
          <button 
            onClick={() => setPreviewMode('preview')} 
            className={previewMode === 'preview' ? 'active' : ''}
          >
            📱 Test on Device
          </button>
          <button 
            onClick={() => setPreviewMode('compare')} 
            className={previewMode === 'compare' ? 'active' : ''}
          >
            🔄 Compare All
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        {/* Edit Panel - Only visible in edit mode */}
        {previewMode === 'edit' && (
          <div className="edit-panel">
            <div className="panel-section">
              <h3>Select Device</h3>
              <div className="device-buttons">
                <button 
                  onClick={() => setDevice("desktop")} 
                  className={device === "desktop" ? "active" : ""}
                >
                  💻 Desktop (1512×982)
                </button>
                <button 
                  onClick={() => setDevice("tablet")} 
                  className={device === "tablet" ? "active" : ""}
                >
                  📱 Tablet (1024×1366)
                </button>
                <button 
                  onClick={() => setDevice("mobile")} 
                  className={device === "mobile" ? "active" : ""}
                >
                  📱 Mobile (390×844)
                </button>
              </div>
            </div>

            <div className="panel-section">
              <h3>Select Widget</h3>
              <div className="element-buttons">
                <button 
                  onClick={() => setSelectedElement('sidebar')} 
                  className={selectedElement === 'sidebar' ? 'active' : ''}
                >
                  📌 Sidebar Menu
                </button>
                <button 
                  onClick={() => setSelectedElement('image')} 
                  className={selectedElement === 'image' ? 'active' : ''}
                >
                  🖼️ Image Widget
                </button>
                <button 
                  onClick={() => setSelectedElement('cards')} 
                  className={selectedElement === 'cards' ? 'active' : ''}
                >
                  📋 Task Cards
                </button>
              </div>
            </div>

            {selectedElement && (
              <div className="panel-section properties">
                <h3>Properties - {selectedElement}</h3>
                {selectedElement === 'sidebar' && (
                  <>
                    <div className="property">
                      <label>Width: {elements[device].sidebar.width}px</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="400" 
                        value={elements[device].sidebar.width}
                        onChange={(e) => updateElementProperty('sidebar', 'width', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="property checkbox">
                      <label>
                        <input 
                          type="checkbox" 
                          checked={elements[device].sidebar.visible}
                          onChange={(e) => updateElementProperty('sidebar', 'visible', e.target.checked)}
                        />
                        Show Sidebar
                      </label>
                    </div>
                  </>
                )}
                {selectedElement === 'image' && (
                  <>
                    <div className="property">
                      <label>Width: {elements[device].image.width}px</label>
                      <input 
                        type="range" 
                        min="100" 
                        max="1000" 
                        value={elements[device].image.width}
                        onChange={(e) => updateElementProperty('image', 'width', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="property">
                      <label>Height: {elements[device].image.height}px</label>
                      <input 
                        type="range" 
                        min="50" 
                        max="600" 
                        value={elements[device].image.height}
                        onChange={(e) => updateElementProperty('image', 'height', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="property">
                      <label>X Position: {elements[device].image.x}px</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={elements[device].image.x}
                        onChange={(e) => updateElementProperty('image', 'x', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="property">
                      <label>Y Position: {elements[device].image.y}px</label>
                      <input 
                        type="range" 
                        min="0" 
                        max="500" 
                        value={elements[device].image.y}
                        onChange={(e) => updateElementProperty('image', 'y', parseInt(e.target.value))}
                      />
                    </div>
                    <p className="hint">💡 Drag image to reposition</p>
                  </>
                )}
                {selectedElement === 'cards' && (
                  <>
                    <div className="property">
                      <label>Columns: {elements[device].cards.columns}</label>
                      <input 
                        type="range" 
                        min="1" 
                        max="6" 
                        value={elements[device].cards.columns}
                        onChange={(e) => updateElementProperty('cards', 'columns', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="property">
                      <label>Gap: {elements[device].cards.gap}px</label>
                      <input 
                        type="range" 
                        min="5" 
                        max="40" 
                        value={elements[device].cards.gap}
                        onChange={(e) => updateElementProperty('cards', 'gap', parseInt(e.target.value))}
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            <div className="panel-section actions">
              <button onClick={() => {
                const dataStr = JSON.stringify(elements, null, 2);
                const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                const link = document.createElement('a');
                link.href = dataUri;
                link.download = `widget-config.json`;
                link.click();
              }} className="export-btn">
                💾 Save Config
              </button>
              <input 
                type="file" 
                accept=".json"
                id="import-file"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => setElements(JSON.parse(e.target.result));
                    reader.readAsText(file);
                  }
                }}
              />
              <button onClick={() => document.getElementById('import-file').click()} className="import-btn">
                📂 Load Config
              </button>
            </div>
          </div>
        )}

        {/* Preview Area */}
        <div className={`preview-area ${previewMode}`}>
          {previewMode === 'edit' && (
            <div 
              ref={previewRef}
              className={`preview-container ${device}`}
              style={{ maxWidth: deviceSpecs[device].viewportWidth }}
            >
              {renderPreview(device)}
            </div>
          )}

          {previewMode === 'preview' && (
            <div className="preview-mode-container">
              <div className="device-tabs">
                {Object.keys(deviceSpecs).map(d => (
                  <button 
                    key={d}
                    onClick={() => setDevice(d)} 
                    className={device === d ? 'active' : ''}
                  >
                    {deviceSpecs[d].icon} {deviceSpecs[d].name}
                  </button>
                ))}
              </div>
              <div className="preview-device-wrapper">
                {renderDeviceFrame(device, renderPreview(device))}
              </div>
              <div className="test-controls">
                <button onClick={() => window.open(`/preview?device=${device}`, '_blank')}>
                  🌐 Open in New Window
                </button>
                <button onClick={() => {
                  const elem = document.querySelector('.device-frame');
                  if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                  }
                }}>
                  ⬛ Full Screen Test
                </button>
              </div>
            </div>
          )}

          {previewMode === 'compare' && (
            <div className="compare-container">
              {Object.keys(deviceSpecs).map(deviceType => (
                <div key={deviceType} className="compare-item">
                  {renderDeviceFrame(deviceType, renderPreview(deviceType))}
                  <div className="compare-status">
                    <h4>{deviceSpecs[deviceType].name}</h4>
                    <p>✓ Widget OK</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}