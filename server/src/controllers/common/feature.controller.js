import Feature from '../../models/feature.model.js'

export const addFeatureImages = async (req, res) => {
    try {
        const { image } = req.body;

        const featureImages = new Feature({
          image,
        });
    
        await featureImages.save();
    
        res.status(201).json({
          success: true,
          data: featureImages,
        });
    } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server error", error: error.message });
      }
}

export const getFeatureImages = async (req, res) => {
    try {
        const images = await Feature.find({});

        res.status(200).json({
          success: true,
          data: images,
        });
    } catch (error) {
        res
          .status(500)
          .json({ success: false, message: "Server error", error: error.message });
      }
}
